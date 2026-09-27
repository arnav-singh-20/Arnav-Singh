#!/usr/bin/env python3
"""Fetch Arnav's public CodeChef profile and write data/codechef.json.

Run by .github/workflows/codechef.yml on a schedule, so the portfolio's
CodeChef numbers stay current without manual edits. Standard library only.
If CodeChef can't be reached or its page layout changes, the script leaves
the existing JSON untouched and exits cleanly, so the site keeps showing the
last good values.
"""
import json
import re
import sys
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

USER = "arnavsingh18"
URL = f"https://www.codechef.com/users/{USER}"
OUT = Path(__file__).resolve().parent.parent / "data" / "codechef.json"


def text(html):
    """Strip tags so the rating blocks read as plain whitespace-separated text."""
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", html))


def rating_block(block):
    """Parse one 'rating-number' block: rating, highest, global/country rank."""
    t = text(block)
    num = re.search(r"^\s*(\d+)(\?)?", t)
    high = re.search(r"Highest Rating (\d+)", t)
    ranks = re.findall(r"(\d+)\s+(Global|Country) Rank", t)
    if not num:
        return None
    out = {"rating": int(num.group(1)), "provisional": bool(num.group(2))}
    if high:
        out["highest"] = int(high.group(1))
    for value, kind in ranks:
        out[kind.lower() + "_rank"] = int(value)
    return out


def main():
    req = urllib.request.Request(URL, headers={"User-Agent": "Mozilla/5.0 (portfolio stats bot)"})
    try:
        html = urllib.request.urlopen(req, timeout=30).read().decode("utf-8", "replace")
    except Exception as e:  # network / blocked — keep the last good data
        print(f"fetch failed: {e}; keeping existing data")
        return 0

    # start each block just after the opening tag, so it reads "1663 … Highest Rating …"
    starts = [m.end() for m in re.finditer(r'class="rating-number"[^>]*>', html)]
    blocks = [html[s:s + 2500] for s in starts]
    # each block runs until the next one (or the end of its rating card)
    for i in range(len(blocks) - 1):
        blocks[i] = html[starts[i]:starts[i + 1]]
    parsed = [b for b in (rating_block(b) for b in blocks) if b]
    if not parsed:
        print("rating block not found (page layout changed?); keeping existing data")
        return 0

    stars = re.search(r'class="rating-star">(.*?)</div>', html, re.S)
    solved = re.search(r"Total Problems Solved:\s*(\d+)", html)
    data = {
        "username": USER,
        "profile": URL,
        "codechef": parsed[0],
        "dsa": parsed[1] if len(parsed) > 1 else None,
        "stars": stars.group(1).count("&#9733;") if stars else None,
        "problems_solved": int(solved.group(1)) if solved else None,
    }
    data["codechef"]["stars"] = data.pop("stars")

    old = json.loads(OUT.read_text()) if OUT.exists() else {}
    comparable = {k: v for k, v in old.items() if k != "updated"}
    if comparable == data:
        print("no change")
        return 0
    data["updated"] = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(data, indent=2) + "\n")
    print("updated:", json.dumps(data))
    return 0


if __name__ == "__main__":
    sys.exit(main())
