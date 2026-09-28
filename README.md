# Arnav Singh — Portfolio

Personal portfolio of **Arnav Singh**, a final-year Computer Engineering student (ABES Engineering College, AKTU · CGPA 8.45) working across **machine learning, LLM fine-tuning, data analytics and backend deployment**.

It is a fast, dependency-free static site (plain HTML, CSS and JavaScript — no build step) with animated case studies for each project, day/night themes and a mobile layout.

🌐 **Live:** [arnav-singh-14q4.onrender.com](https://arnav-singh-14q4.onrender.com/)

📧 [arnavwork08@gmail.com](mailto:arnavwork08@gmail.com) · 💼 [LinkedIn](https://www.linkedin.com/in/-singharnav/) · 🐙 [GitHub](https://github.com/arnav-singh-20) · 📊 [Kaggle](https://www.kaggle.com/singharnav18) · 🧩 [LeetCode](https://leetcode.com/u/arnavsingh18/) · ⭐ [CodeChef](https://www.codechef.com/users/arnavsingh18)

---

## Projects featured

| Project | What it does | Stack | Links |
|---|---|---|---|
| **Credit Card Fraud Detection** | Catches 87.5% of fraud at a 0.152% false-alarm rate (AUC-PR 0.9752) on 284K transactions; ~£5,338 saved vs. no detection. Served as a live REST API. | Python, XGBoost, SMOTE, SHAP, FastAPI, Docker, MLflow, Render | [Live API](https://fraud-detection-model-wvtj.onrender.com/docs) · [Code](https://github.com/arnav-singh-20/Fraud-Detection-Model) |
| **AI-Based Fake Identity & Document Screening** | Five-stage pipeline — OCR → validation (ICAO 9303 MRZ) → tamper detection (ELA) → face verification → risk score — giving PASS / FLAG verdicts. | Python, OpenCV, EasyOCR, DeepFace/InsightFace, Streamlit | [Live demo](https://ai-based-fake-identity-document-screening-system.streamlit.app/) · [Code](https://github.com/arnav-singh-20/AI-Based-Fake-Identity-Document-Screening-System) |
| **LegalSimplify (Mistral-7B)** | Fine-tuned Mistral-7B-Instruct with LoRA + 4-bit quantisation (~75% less training memory); rank ablation 4–64 found r = 16 optimal. | LoRA, QLoRA, BitsAndBytes, Hugging Face | [Code](https://github.com/arnav-singh-20/Lawgorithm-Legal-Text-Simplifier-Mistral-7B-LoRA-) |
| **Legal Query Classifier (BERT)** | Multi-task legal text classification at 90%+ accuracy, weighted loss for class imbalance, served as a containerised microservice. | BERT, FastAPI, Docker | [Code](https://github.com/arnav-singh-20/Legal-AI-Assistant) |
| **ShipTrack** | Role-based MERN logistics tracker with JWT auth, a 9-endpoint REST API and a live shipment timeline. | React, Node.js, Express, MongoDB, Vercel, Render | [Live app](https://ship-tracker-eight.vercel.app/) · [Code](https://github.com/arnav-singh-20/ShipTracker) |
| **Customer Churn & Cohort Retention** | SQL cohort analysis of 540K+ transactions identifying Month 3 as the critical churn window, validated with chi-square and t-tests. | SQL, Python, statsmodels, Power BI | [Code](https://github.com/arnav-singh-20/ecommerce-churn-cohort-analysis) |
| **Power BI Sales Dashboard** | Multi-page dashboard across 4 regions and 3 categories that surfaced 8–12% margin erosion from discounting. | Power BI, DAX | [Code](https://github.com/arnav-singh-20/powerbi-sales-dashboard) |
| **FIFA World Cup 2026 Prediction Model** | Transparent Elo ratings + Monte Carlo bracket simulation (20,000+ live runs); called 4 of 5 knockout matches before kick-off and 2 of 2 awards, with every call locked in and scored honestly. | Python, JavaScript, Elo, Monte Carlo, Render | [Live app](https://fifa2026-prediction-model.onrender.com/) · [Code](https://github.com/arnav-singh-20/FIFA-2026-Prediction-Model) |

## What's on the site

- **Home** — hero with a live terminal that "runs" the projects, featured project tiles with animated illustrations, impact counters, a scroll-driven *how I build* pipeline, a filterable project explorer, a skills matrix (hover a skill to see where it's used), a journey timeline, coding profiles, certifications and resume downloads.
- **Case studies** — one page per project (`/#p-<project>`): the problem, a plain-English explanation, the step-by-step approach, key metrics, stack and lessons learned.
- **About** — background, leadership & education, achievements.
- **Showcase** — a 3D carousel of every project.
- **Live CodeChef stats** — CodeChef rating, DSA rating, ranks and problems solved, kept up to date automatically (see below).
- Day / night theme, reading-progress bar, reduced-motion support and a responsive mobile layout.

## Live CodeChef stats

`scripts/update_codechef.py` reads the public profile at [codechef.com/users/arnavsingh18](https://www.codechef.com/users/arnavsingh18) and writes `data/codechef.json`. The GitHub Action in `.github/workflows/codechef.yml` runs it every 6 hours and commits only when a number changes, so the portfolio updates itself. To refresh immediately: **Actions → Update CodeChef stats → Run workflow**. If CodeChef can't be reached, the last good numbers stay in place.

## Run it locally

No install needed — it is a static site. From the repository root:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

> Serve it from the site root (as above). Opening `index.html` directly via `file://` won't load the assets, because they use root-relative paths (`/assets/...`).

## Deploy

Works on any static host with the repository root as the publish directory — Render (Static Site), Vercel, Netlify or GitHub Pages (user/organisation site or custom domain, so it is served from `/`). No build command and no rewrite rules are needed: pages use hash URLs (`/#about`, `/#p-fraud-detection`), and the files in `work/`, `about/` and `playground/` redirect older paths to them.

## Project structure

```
index.html          all pages (home, about, showcase, case-study view) + the router
css/site.css        shared theme tokens, nav, footer
css/arnav.css       components added for this portfolio (explorer, case studies, art)
js/site.js          nav, footer and contact drawer
js/arnav.js         project data (single source of truth), animated SVG art, components
data/codechef.json  live CodeChef stats (auto-updated)
scripts/            CodeChef stats updater used by the GitHub Action
assets/             images, resumes (assets/resume/) and site artwork
work/ about/ playground/   redirect pages for shareable / legacy URLs
```

To add or edit a project, update the `PROJECTS` list at the top of `js/arnav.js` — the home tiles, explorer cards, showcase carousel and case-study pages are all generated from it. If you add a project, also add its slug to `SLUGS` in the router at the top of `index.html`.

## Resumes

- [AI / ML Engineer](assets/resume/Arnav-Singh-AIML-Resume.pdf)
- [Data / Business Analyst](assets/resume/Arnav-Singh-Data-Analyst-Resume.pdf)
- [Software / Full-Stack](assets/resume/Arnav-Singh-FullStack-Resume.pdf)

## Credits

The visual theme (sky, meadow and garden artwork) is adapted from an existing portfolio template. All content, case studies, SVG illustrations and interactive components are by Arnav Singh.
