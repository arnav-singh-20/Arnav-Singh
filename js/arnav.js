/* ════════════════════════════════════════════════════════════════════════
   arnav.js — Arnav Singh's portfolio content + interactive components.

   Loaded synchronously in <head> so every inline script further down (router,
   playground carousel) can read window.AX. Components that need the DOM
   initialise on DOMContentLoaded.

     AX.PROJECTS        single source of truth for every project
     AX.art(key)        animated inline-SVG illustration for a project
     AX.renderProject() builds the /work/<slug> case-study view
     home components    impact counters, build pipeline, project explorer,
                        skills matrix, journey timeline, profiles
   ════════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const LINKS = {
    email:    'arnavwork08@gmail.com',
    phone:    '+91 7428775691',
    linkedin: 'https://www.linkedin.com/in/-singharnav/',
    github:   'https://github.com/arnav-singh-20',
    kaggle:   'https://www.kaggle.com/singharnav18',
    leetcode: 'https://leetcode.com/u/arnavsingh18/',
    codechef: 'https://www.codechef.com/users/arnavsingh18',
    resume:   '/assets/resume/Arnav-Singh-ML-Engineer-Resume.pdf',
    gsc:      'https://developers.google.com/profile/badges/community/solution-challenge/2025/participant',
    agents:   'https://developers.google.com/profile/badges/events/cloud/five-day-ai-agents?u=102108331226690283295',
    gdgoc:    'https://developers.google.com/profile/badges/community/gdg/GDGoC/member',
    credly:   'https://www.credly.com/badges/4a172ee7-5d7b-42dd-86bb-da1354225d7c'
  };

  /* ── categories used by the project explorer filter ── */
  const CATS = {
    ml:    'Machine Learning',
    nlp:   'NLP & LLMs',
    cv:    'Computer Vision',
    data:  'Data Analytics',
    full:  'Full-Stack & APIs'
  };

  /* ── every project. `featured` ones also get a large home tile. ──
     metrics: v = number, d = decimals, pre/suf wrap the counted value. */
  const PROJECTS = [
    {
      slug: 'fraud-detection', art: 'fraud', featured: true,
      title: 'Credit Card Fraud Detection',
      kicker: 'Production ML · Live REST API',
      short: 'A fraud model on 284K transactions that catches 87.5% of fraud and runs as a live REST API.',
      cats: ['ml', 'full'], year: '2025', role: 'End-to-end: data → model → API',
      stack: ['Python', 'XGBoost', 'SMOTE', 'SHAP', 'FastAPI', 'Docker', 'MLflow', 'Render'],
      live: 'https://fraud-detection-model-wvtj.onrender.com/docs', liveLabel: 'Live API docs',
      github: 'https://github.com/arnav-singh-20/Fraud-Detection-Model',
      metrics: [
        { v: 0.9752, d: 4, label: 'AUC-PR — how well it finds the rare fraud cases' },
        { v: 87.5, d: 1, suf: '%', label: 'of fraud caught (recall)' },
        { v: 0.152, d: 3, suf: '%', label: 'false-alarm rate on genuine payments' },
        { v: 5338, d: 0, pre: '£', label: 'fraud losses prevented vs. no detection' }
      ],
      problem: 'In a dataset of 284K card transactions, fewer than 1% are fraud. A model that simply says “not fraud” every time looks almost perfectly accurate — and catches nothing. Missing fraud costs money; blocking honest customers costs trust.',
      simple: 'Think of it as a very picky security guard: it has to spot the rare thief in a huge crowd without stopping too many honest shoppers.',
      steps: [
        { t: 'Handle the imbalance', d: 'Used SMOTE so the model sees enough fraud examples to learn from.' },
        { t: 'Train XGBoost', d: 'Gradient-boosted trees on the engineered pipeline, tracked with MLflow.' },
        { t: 'Measure what matters', d: 'Judged with AUC-PR and recall instead of accuracy — reaching 0.9752 AUC-PR, 87.5% recall and a 0.152% false-alarm rate.' },
        { t: 'Explain decisions', d: 'SHAP waterfall analysis explains each transaction and surfaced the top 5 behavioural features driving fraud risk — written up in business-readable form.' },
        { t: 'Ship it', d: 'Containerised with Docker and deployed on Render as a REST API with a real-time inference endpoint.' }
      ],
      learned: 'Accuracy is the wrong question on imbalanced data. Picking the right metric — and being able to explain each decision — matters more than the model itself.'
    },
    {
      slug: 'fake-id-screening', art: 'fakeid', featured: true,
      title: 'AI-Based Fake Identity & Document Screening',
      kicker: 'Computer Vision · Streamlit dashboard',
      short: 'A five-stage pipeline that reads, validates, inspects and face-matches ID documents to give a PASS / FLAG verdict.',
      cats: ['cv', 'ml'], year: '2025', role: 'Pipeline design & build',
      stack: ['Python', 'OpenCV', 'EasyOCR', 'Tesseract', 'DeepFace', 'InsightFace', 'Streamlit'],
      live: 'https://ai-based-fake-identity-document-screening-system.streamlit.app/', liveLabel: 'Live demo',
      github: 'https://github.com/arnav-singh-20/AI-Based-Fake-Identity-Document-Screening-System',
      metrics: [
        { v: 5, d: 0, label: 'stage pipeline, from OCR to risk score' },
        { v: 0, d: 0, raw: '0', label: 'models trained — pretrained models + classical CV only' },
        { v: 9303, d: 0, pre: 'ICAO ', label: 'MRZ parsing with check-digit computation' },
        { v: 2, d: 0, label: 'real-time verdicts: PASS or FLAG' }
      ],
      problem: 'Fake identity documents can hide the forgery in the text, the photo or the pixels themselves. Checking all of that by hand is slow and inconsistent.',
      simple: 'It works like a careful officer: read the card, check the details make sense, look for edited pixels, compare the face with the person, then decide.',
      steps: [
        { t: 'OCR', d: 'EasyOCR / Tesseract extract the printed fields and the machine-readable zone (MRZ).' },
        { t: 'Validation', d: 'ICAO 9303 MRZ parsing with check-digit computation, plus rule-based checks on dates, document-number regex and ISO nationality codes.' },
        { t: 'Tamper detection', d: 'Error Level Analysis with heatmap visualisation to localise tampered image regions.' },
        { t: 'Face verification', d: 'DeepFace / InsightFace face-embedding similarity between the document photo and the person.' },
        { t: 'Risk scoring', d: 'A tunable weighted risk-scoring model turns every signal into a real-time PASS / FLAG verdict, deployed as an interactive Streamlit dashboard.' }
      ],
      learned: 'A genuinely useful system does not always need training — understanding the domain rules and combining simple, explainable signals goes a long way.'
    },
    {
      slug: 'legalsimplify', art: 'legal', featured: true,
      title: 'LegalSimplify — Legal Clause Simplifier',
      kicker: 'LLM Fine-tuning · Mistral-7B + LoRA',
      short: 'Fine-tuned Mistral-7B-Instruct with LoRA and 4-bit quantisation to rewrite legal clauses in plain language.',
      cats: ['nlp'], year: '2025', role: 'Fine-tuning & evaluation',
      stack: ['Mistral-7B', 'LoRA', 'QLoRA', 'BitsAndBytes', 'Hugging Face'],
      github: 'https://github.com/arnav-singh-20/Lawgorithm-Legal-Text-Simplifier-Mistral-7B-LoRA-',
      metrics: [
        { v: 75, d: 0, pre: '~', suf: '%', label: 'less training memory with 4-bit quantisation' },
        { v: 16, d: 0, pre: 'r = ', label: 'best LoRA rank for the legal domain' },
        { v: 5, d: 0, label: 'LoRA ranks compared (4, 8, 16, 32, 64)' },
        { v: 3, d: 0, label: 'measures: perplexity, latency, task quality' }
      ],
      problem: 'Legal clauses are written for lawyers, so most people sign things they cannot really read. Fine-tuning a 7-billion-parameter model to fix that normally needs far more GPU memory than a student has.',
      simple: 'Before: “The indemnified party shall be held harmless from all liabilities…”. After: “The protected party won’t have to pay for damage caused by the other side.”',
      steps: [
        { t: 'Custom dataset', d: 'Built a custom legal dataset of clauses paired with plain-language rewrites.' },
        { t: '4-bit quantisation', d: 'Loaded Mistral-7B-Instruct in 4-bit with BitsAndBytes, reducing training memory by ~75%.' },
        { t: 'LoRA fine-tuning', d: 'Trained small LoRA adapters instead of all 7B weights.' },
        { t: 'Ablation study', d: 'Compared LoRA ranks 4, 8, 16, 32 and 64 on perplexity, inference latency and task quality.' },
        { t: 'Pick the winner', d: 'Rank 16 was the best balance for the legal domain.' }
      ],
      bars: { title: 'Training memory (relative)', unit: '%', max: 100, items: [['Full precision', 100], ['4-bit + LoRA', 25]] },
      learned: 'Bigger is not automatically better. A small, well-run ablation told me more than guessing the “best” settings.'
    },
    {
      slug: 'churn-cohort', art: 'cohort', featured: true,
      title: 'Customer Churn & Cohort Retention Analysis',
      kicker: 'Data Analytics · SQL + Python',
      short: 'Advanced SQL on 540K+ transactions that identified Month 3 as the critical churn window.',
      cats: ['data'], year: '2025', role: 'Analyst — SQL, statistics & storytelling',
      stack: ['SQL', 'CTEs', 'Window Functions', 'Python', 'statsmodels', 'Power BI', 'Matplotlib', 'Seaborn'],
      github: 'https://github.com/arnav-singh-20/ecommerce-churn-cohort-analysis',
      metrics: [
        { v: 540, d: 0, suf: 'K+', label: 'transactions analysed' },
        { v: 3, d: 0, pre: 'Month ', label: 'identified as the critical churn window' },
        { v: 60, d: 0, suf: '%+', label: 'of at-risk customers dropped off there' },
        { v: 2, d: 0, label: 'hypothesis tests — chi-square and t-test' }
      ],
      problem: 'Early-stage churn was the primary revenue risk, but nobody knew exactly when customers were leaving — so retention money could not be targeted.',
      simple: 'A cohort is a group of customers who first bought in the same month. Following each group over time shows exactly when people stop coming back.',
      steps: [
        { t: 'Advanced SQL', d: 'CTEs, window functions and cohort analysis over 540K+ transactions.' },
        { t: 'Find the window', d: 'Identified Month 3 as the critical churn window, where 60%+ of at-risk customers dropped off.' },
        { t: 'Retention curves', d: 'Segmented customers by acquisition cohort and built monthly retention curves in Python (Matplotlib / Seaborn).' },
        { t: 'Prove it', d: 'Chi-square and t-tests validated that the churn signal was significant across cohorts.' },
        { t: 'Business case', d: 'Quantified revenue risk per cohort and modelled revenue recovery from better retention, informing campaign-spend reallocation.' }
      ],
      learned: 'The most valuable output of analysis is a decision. “Focus retention on the first three months” is worth more than any chart.'
    },
    {
      slug: 'legal-query-classifier', art: 'bert',
      title: 'Legal Query Classifier (BERT)',
      kicker: 'NLP · Containerised backend service',
      short: 'Fine-tuned BERT for multi-task legal text classification, served via FastAPI in Docker.',
      cats: ['nlp', 'full'], year: '2025', role: 'Model + backend service',
      stack: ['BERT', 'Hugging Face', 'FastAPI', 'Docker'],
      github: 'https://github.com/arnav-singh-20/Legal-AI-Assistant',
      metrics: [
        { v: 90, d: 0, suf: '%+', label: 'classification accuracy' },
        { v: 3, d: 0, label: 'metrics tracked per class — precision, recall, F1' },
        { v: 1, d: 0, label: 'Dockerised FastAPI microservice' }
      ],
      problem: 'Legal questions arrive as messy natural language. Routing them correctly needs a model that understands legal text — and some classes are much rarer than others.',
      simple: 'You type a legal question in plain words; the service tells you what kind of legal matter it is.',
      steps: [
        { t: 'Fine-tune BERT', d: 'Multi-task legal text classification on a fine-tuned BERT model.' },
        { t: 'Fix imbalance', d: 'Weighted loss so rare classes are not ignored.' },
        { t: 'Evaluate honestly', d: 'Precision, recall and F1 per class, with failure modes documented for future maintainers.' },
        { t: 'Serve it', d: 'Containerised with Docker and served via FastAPI — a typical backend microservice deployment pattern.' }
      ],
      learned: 'Per-class metrics reveal the weak spots that one overall accuracy number hides.'
    },
    {
      slug: 'shiptrack', art: 'ship',
      title: 'ShipTrack — Full-Stack Logistics Tracking',
      kicker: 'Full-Stack · MERN',
      short: 'Role-based MERN app with JWT authentication, a 9-endpoint REST API and a live shipment timeline.',
      cats: ['full'], year: '2026', role: 'Full-stack developer',
      stack: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Render', 'Vercel', 'Git'],
      live: 'https://ship-tracker-eight.vercel.app/', liveLabel: 'Live app',
      github: 'https://github.com/arnav-singh-20/ShipTracker',
      metrics: [
        { v: 9, d: 0, label: 'REST API endpoints' },
        { v: 2, d: 0, label: 'platforms deployed — Render (API) + Vercel (client)' },
        { v: 1, d: 0, label: 'JWT-secured, role-based access model' }
      ],
      problem: 'A logistics dashboard needs more than screens: logins, permissions and data that each user is only allowed to see their own of.',
      simple: 'Staff post status updates; customers log in and watch their shipment move along a timeline — and can only ever see their own data.',
      steps: [
        { t: 'Auth', d: 'JWT authentication with role-based access.' },
        { t: 'REST API', d: 'A 9-endpoint Express API over MongoDB.' },
        { t: 'Data isolation', d: 'Access enforced at the query layer, not just hidden in the UI.' },
        { t: 'React front-end', d: 'Dashboard plus a live shipment-status timeline.' },
        { t: 'Deploy', d: 'API on Render and client on Vercel.' }
      ],
      learned: 'Security belongs in the data layer — filtering inside the query is what actually keeps users’ data apart.'
    },
    {
      slug: 'powerbi-sales', art: 'bi',
      title: 'Power BI Sales Performance Dashboard',
      kicker: 'Business Intelligence · DAX',
      short: 'Multi-page interactive dashboard across 4 regions and 3 categories that surfaced 8–12% margin erosion from discounts.',
      cats: ['data'], year: '2025', role: 'BI developer',
      stack: ['Power BI', 'DAX', 'Data Modeling', 'Excel'],
      github: 'https://github.com/arnav-singh-20/powerbi-sales-dashboard',
      metrics: [
        { v: 4, d: 0, label: 'regions tracked' },
        { v: 3, d: 0, label: 'product categories' },
        { v: 12, d: 0, pre: '8–', suf: '%', label: 'estimated margin erosion from discount leakage' }
      ],
      problem: 'Revenue looked healthy, but margin was leaking and teams kept asking for one-off reports to find out why.',
      simple: 'One interactive dashboard answers “what sold, where, and did the discount actually pay off?” — no report requests needed.',
      steps: [
        { t: 'Multi-page dashboard', d: 'Sales performance across 4 regions and 3 product categories.' },
        { t: 'DAX measures', d: 'Dynamic KPIs: month-over-month growth, rolling averages, rank by rep.' },
        { t: 'Drill-through', d: 'By category, region and time period for self-serve analysis.' },
        { t: 'Find the leak', d: 'Discount-leakage patterns causing an estimated 8–12% margin erosion, plus a top/bottom SKU revenue waterfall. Recommendations were adopted by stakeholders.' }
      ],
      learned: 'Good dashboards remove meetings — design for the questions people actually ask.'
    },
    {
      slug: 'fifa-2026', art: 'fifa',
      title: 'FIFA World Cup 2026 Prediction Model',
      kicker: 'Elo ratings · Monte Carlo simulation · Live app',
      short: 'A transparent Elo + Monte Carlo model that called 4 of 5 World Cup knockout matches before they were played — every prediction locked in and scored honestly.',
      cats: ['ml', 'full'], year: '2026', role: 'Model design + web app',
      stack: ['Python', 'JavaScript', 'Elo ratings', 'Monte Carlo', 'Probability', 'Render'],
      live: 'https://fifa2026-prediction-model.onrender.com/', liveLabel: 'Live app',
      github: 'https://github.com/arnav-singh-20/FIFA-2026-Prediction-Model',
      metrics: [
        { v: 80, d: 0, suf: '%', label: 'knockout calls correct — 4 of 5, made before kick-off' },
        { v: 2, d: 0, suf: '/2', label: 'individual awards matched FIFA (Golden Boot, Golden Glove)' },
        { v: 200, d: 0, suf: 'K', label: 'Monte Carlo trials behind the frozen title odds' },
        { v: 0, d: 0, raw: '0', label: 'servers needed — the whole model runs in the browser' }
      ],
      problem: 'Most football “predictions” are opinions, quietly edited after the fact. I wanted a model simple enough to audit, whose every call was locked in before the match and then scored against what actually happened — misses included.',
      simple: 'Every team gets a strength score. The bigger the gap between two teams, the more likely the stronger one wins. Then the rest of the tournament is played out thousands of times on the computer to count how often each team lifts the trophy.',
      steps: [
        { t: 'Power rating', d: 'Elo-style score per team: 1500 + 40 × group points + 15 × goal difference + 90 × knockout wins + a form adjustment. Knockout wins weigh most — surviving elimination is the strongest signal.' },
        { t: 'Win probability', d: 'The classic Elo logistic curve turns a rating gap into a probability — a 100-point gap is about 64% vs 36%, and no team is ever 0% or 100%.' },
        { t: 'Monte Carlo bracket', d: 'Each unplayed tie is a weighted coin flip; the full bracket is simulated tens of thousands of times (20,000+ live) to turn match odds into title odds.' },
        { t: 'Results as ground truth', d: 'Confirmed results locked a team through for every future simulation and lifted its rating — the bracket, odds and awards all recomputed instantly.' },
        { t: 'Score it honestly', d: 'After the final (Spain 1–0 Argentina, a.e.t.) the app was frozen: 4 of 5 knockout calls correct, 2 of 2 awards — with known results excluded from the count.' }
      ],
      bars: { title: 'The model’s calls, made before each match', unit: '%', max: 100, items: [['England (QF) ✓', 61], ['Argentina (QF) ✓', 70], ['France (SF1) ✗', 68], ['Argentina (SF2) ✓', 69], ['Spain (Final) ✓', 64]] },
      barsNote: 'Win probability the model gave its pick. The one miss — France at 68% — is what a 68% favourite looks like: it loses about 3 times in 10.',
      learned: 'A model you can audit beats a clever black box. Publishing the misses — not just the hits — is what makes a prediction trustworthy.'
    }
  ];
  const BY_SLUG = {};
  PROJECTS.forEach((p, i) => { p.index = i; BY_SLUG[p.slug] = p; });

  /* ════════════════════════════════════════════════════════════════════
     ART — animated inline-SVG scenes, one per project. Pure SVG + the
     .axa-* keyframes in css/arnav.css, so they're crisp at any size and
     cost nothing to load. viewBox 600×400; `slice` crops to fill.
     ════════════════════════════════════════════════════════════════════ */
  const INK = '#1b1b1b', CREAM = '#fff9f1', CORAL = '#fc9073', GOLD = '#f6c740', SKY = '#71b7f4', SAGE = '#9fb37a', NAVY = '#111c36';

  function svg(bg, body, label) {
    return '<svg class="ax-art" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice" role="img" aria-label="' + label + '">' +
      '<defs><pattern id="axdots" width="18" height="18" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.1" fill="rgba(0,0,0,.08)"/></pattern></defs>' +
      '<rect width="600" height="400" fill="' + bg + '"/><rect width="600" height="400" fill="url(#axdots)"/>' + body + '</svg>';
  }
  function card(x, y, w, h, fill, extra) {
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="16" fill="' + (fill || CREAM) + '" stroke="' + INK + '" stroke-width="2" ' + (extra || '') + '/>';
  }
  function txt(x, y, s, size, extra) {
    return '<text x="' + x + '" y="' + y + '" font-family="Space Grotesk, sans-serif" font-size="' + (size || 14) + '" fill="' + INK + '" ' + (extra || '') + '>' + s + '</text>';
  }

  const ART = {
    fraud() {
      let dots = '';
      // a stream of transactions flowing left→right; a few are fraud (coral, pulsing)
      for (let i = 0; i < 26; i++) {
        const y = 70 + ((i * 53) % 260), fraud = i % 9 === 4;
        dots += '<circle class="axa-flow" style="--d:' + (-(i * 0.37)).toFixed(2) + 's;--dur:' + (6 + (i % 5)) + 's" cx="0" cy="' + y + '" r="' + (fraud ? 7 : 4.5) + '" fill="' + (fraud ? CORAL : INK) + '" opacity="' + (fraud ? 1 : 0.35) + '"/>';
      }
      return svg('#dbe9f6',
        dots +
        card(300, 60, 260, 230) +
        txt(322, 92, 'PRECISION–RECALL', 12, 'letter-spacing="1.5" opacity=".6"') +
        '<path d="M322 110 V260 H540" fill="none" stroke="' + INK + '" stroke-width="1.5" opacity=".4"/>' +
        '<path class="axa-draw" d="M322 118 C 420 118 480 122 505 150 S 530 230 540 258" fill="none" stroke="' + CORAL + '" stroke-width="4" stroke-linecap="round" pathLength="1"/>' +
        txt(360, 208, '0.9752', 38, 'font-family="DM Serif Display, serif"') +
        txt(362, 228, 'AUC-PR', 12, 'letter-spacing="2" opacity=".6"') +
        '<g class="axa-pop" style="--d:1.2s">' + card(60, 290, 200, 64, CORAL) + txt(80, 318, 'FRAUD FLAGGED', 12, 'letter-spacing="1.5"') + txt(80, 340, 'recall 87.5%', 15, 'font-weight="700"') + '</g>',
        'Animated transaction stream with fraud cases highlighted and a precision-recall curve');
    },
    fakeid() {
      return svg('#f3e3cf',
        '<g transform="translate(90 70)">' + card(0, 0, 420, 260) +
        '<rect x="24" y="30" width="110" height="140" rx="10" fill="#e8dcc6" stroke="' + INK + '" stroke-width="2"/>' +
        '<circle cx="79" cy="82" r="26" fill="' + SAGE + '" stroke="' + INK + '" stroke-width="2"/><path d="M40 170 C 45 125 113 125 118 170" fill="' + SAGE + '" stroke="' + INK + '" stroke-width="2"/>' +
        ['160,48,180', '160,74,220', '160,100,150', '160,126,200'].map((s, i) => { const a = s.split(','); return '<rect class="axa-grow" style="--d:' + (0.2 + i * 0.15) + 's" x="' + a[0] + '" y="' + a[1] + '" width="' + a[2] + '" height="10" rx="5" fill="' + INK + '" opacity=".75"/>'; }).join('') +
        txt(24, 212, 'P&lt;IND SINGH&lt;&lt;ARNAV&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;', 13, 'font-family="JetBrains Mono, monospace" opacity=".7"') +
        txt(24, 234, 'Z1234567&lt;8IND0501012M2701019&lt;&lt;&lt;&lt;', 13, 'font-family="JetBrains Mono, monospace" opacity=".7"') +
        '<rect class="axa-tamper" x="300" y="140" width="90" height="46" rx="6" fill="' + CORAL + '" opacity=".0"/>' +
        '<rect class="axa-scan" x="-10" y="0" width="440" height="4" fill="' + SKY + '"/>' +
        '</g>' +
        '<g class="axa-pop" style="--d:1.6s">' + card(410, 300, 150, 56, GOLD) + txt(430, 334, 'RISK: FLAG', 16, 'font-weight="700"') + '</g>',
        'ID card being scanned, with an edited region highlighted and a risk verdict');
    },
    legal() {
      let dense = '', plain = '';
      for (let i = 0; i < 9; i++) dense += '<rect x="80" y="' + (96 + i * 17) + '" width="' + (170 - (i % 3) * 18) + '" height="7" rx="3.5" fill="' + INK + '" opacity=".55"/>';
      for (let i = 0; i < 4; i++) plain += '<rect class="axa-type" style="--d:' + (0.6 + i * 0.45) + 's" x="352" y="' + (110 + i * 30) + '" width="' + (160 - i * 22) + '" height="12" rx="6" fill="' + INK + '"/>';
      return svg('#eee8d2',
        card(60, 60, 210, 240) + txt(80, 86, 'CLAUSE 14.2(b)', 11, 'letter-spacing="1.5" opacity=".6"') + dense +
        card(330, 60, 210, 240, '#fff') + txt(352, 86, 'PLAIN ENGLISH', 11, 'letter-spacing="1.5" opacity=".6"') + plain +
        '<g class="axa-nudge"><circle cx="300" cy="180" r="26" fill="' + CORAL + '" stroke="' + INK + '" stroke-width="2"/><path d="M290 180 H310 M302 171 L311 180 L302 189" stroke="' + INK + '" stroke-width="2.5" fill="none" stroke-linecap="round"/></g>' +
        card(170, 322, 260, 44, GOLD) + txt(190, 350, 'Mistral-7B · QLoRA · r = 16', 15, 'font-weight="700"'),
        'Dense legal clause being rewritten into plain English by a fine-tuned model');
    },
    cohort() {
      let cells = '';
      const cols = ['#fc9073', '#f9a98e', '#f6c740', '#f3d98a', '#c9d6a3', '#e7ecd9'];
      for (let r = 0; r < 7; r++) for (let c = 0; c < 7 - r; c++) {
        const k = Math.min(5, c + (c >= 3 ? 1 : 0));
        cells += '<rect class="axa-pop" style="--d:' + ((r + c) * 0.07).toFixed(2) + 's" x="' + (150 + c * 50) + '" y="' + (72 + r * 36) + '" width="46" height="32" rx="6" fill="' + cols[c === 0 ? 0 : k] + '" stroke="' + INK + '" stroke-width="1.2"/>';
      }
      let labels = '';
      for (let c = 0; c < 7; c++) labels += txt(162 + c * 50, 62, 'M' + c, 12, 'opacity=".6"');
      for (let r = 0; r < 7; r++) labels += txt(88, 93 + r * 36, 'Cohort ' + (r + 1), 11, 'opacity=".6"');
      return svg('#e3ecd6', labels + cells +
        '<rect class="axa-blink" x="296" y="66" width="52" height="264" rx="10" fill="none" stroke="' + CORAL + '" stroke-width="4" stroke-dasharray="8 6"/>' +
        card(390, 300, 170, 60, CREAM) + txt(408, 326, 'CHURN WINDOW', 11, 'letter-spacing="1.5" opacity=".6"') + txt(408, 348, 'Month 3', 18, 'font-weight="700"'),
        'Cohort retention heatmap highlighting the month-3 churn window');
    },
    bert() {
      const bars = [['Civil', 78], ['Property', 15], ['Family', 5]];
      return svg('#dfe6f5',
        card(40, 60, 200, 70, '#fff') + txt(58, 90, '“Landlord won’t return', 13) + txt(58, 110, 'my deposit…”', 13) +
        '<path class="axa-dash" d="M240 95 H300" stroke="' + INK + '" stroke-width="2" stroke-dasharray="6 5"/>' +
        card(300, 50, 110, 250, GOLD) + txt(330, 170, 'BERT', 22, 'font-family="DM Serif Display, serif"') + txt(318, 192, '[CLS] pooled', 11, 'opacity=".7"') +
        '<path class="axa-dash" d="M410 110 H450 M410 240 H450" stroke="' + INK + '" stroke-width="2" stroke-dasharray="6 5"/>' +
        card(450, 60, 120, 110) + txt(464, 84, 'DOMAIN', 11, 'letter-spacing="1.5" opacity=".6"') +
        bars.map((b, i) => '<rect class="axa-growx" style="--d:' + (0.4 + i * 0.2) + 's" x="464" y="' + (96 + i * 22) + '" width="' + (b[1] * 0.9 + 6) + '" height="12" rx="6" fill="' + (i ? INK : CORAL) + '" opacity="' + (i ? 0.4 : 1) + '"/>').join('') +
        card(450, 190, 120, 110) + txt(464, 214, 'INTENT', 11, 'letter-spacing="1.5" opacity=".6"') + txt(464, 246, 'Needs', 16, 'font-weight="700"') + txt(464, 266, 'lawyer', 16, 'font-weight="700"') +
        card(40, 300, 200, 50, CORAL) + txt(58, 331, 'FastAPI · /predict', 15, 'font-weight="700"'),
        'A legal question flowing through BERT into domain and intent predictions');
    },
    ship() {
      return svg('#d9ecef',
        '<path d="M70 300 C 160 120 300 330 380 170 S 520 90 540 110" fill="none" stroke="' + INK + '" stroke-width="3" stroke-dasharray="10 8" opacity=".5"/>' +
        [[70, 300], [230, 230], [380, 170], [540, 110]].map((p, i) => '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="12" fill="' + (i < 3 ? CORAL : CREAM) + '" stroke="' + INK + '" stroke-width="2"/>').join('') +
        '<g class="axa-ride"><rect x="-22" y="-14" width="44" height="28" rx="6" fill="' + GOLD + '" stroke="' + INK + '" stroke-width="2"/><circle cx="-10" cy="16" r="5" fill="' + INK + '"/><circle cx="12" cy="16" r="5" fill="' + INK + '"/></g>' +
        '<path id="axShipPath" d="M70 300 C 160 120 300 330 380 170 S 520 90 540 110" fill="none"/>' +
        card(60, 40, 220, 96) + txt(80, 68, 'SHIPMENT #SHP-2291', 11, 'letter-spacing="1.2" opacity=".6"') + txt(80, 96, 'In transit', 22, 'font-family="DM Serif Display, serif"') + txt(80, 118, 'Delhi → Mumbai · JWT secured', 12, 'opacity=".7"'),
        'A parcel moving along a tracked route with status checkpoints');
    },
    bi() {
      const h = [120, 170, 140, 210, 180, 240];
      return svg('#f4e6c8',
        card(40, 40, 520, 320) +
        [['Revenue', '₹4.2M'], ['Margin', '−9.6%'], ['MoM', '+3.1%']].map((k, i) => card(62 + i * 165, 60, 150, 70, i === 1 ? CORAL : '#fff') + txt(78 + i * 165, 86, k[0].toUpperCase(), 11, 'letter-spacing="1.5" opacity=".6"') + txt(78 + i * 165, 114, k[1], 22, 'font-family="DM Serif Display, serif"')).join('') +
        h.map((v, i) => '<rect class="axa-grow" style="--d:' + (i * 0.12) + 's" x="' + (80 + i * 70) + '" y="' + (340 - v * 0.8) + '" width="44" height="' + (v * 0.8) + '" rx="6" fill="' + (i === 5 ? GOLD : SKY) + '" stroke="' + INK + '" stroke-width="1.5"/>').join('') +
        '<path class="axa-draw" d="M102 245 L172 215 L242 232 L312 180 L382 205 L452 160" fill="none" stroke="' + INK + '" stroke-width="3" pathLength="1" stroke-linecap="round"/>',
        'Sales dashboard with KPI cards, animated bars and a trend line');
    },
    fifa() {
      // semifinal bracket → final, plus title-odds bars and a bouncing ball
      const team = (x, y, name, fill) => card(x, y - 20, 116, 40, fill || '#fff') + txt(x + 14, y + 5, name, 14);
      const odds = [['Spain', 64, CORAL], ['Argentina', 36, SKY]];
      return svg('#d8ecd0',
        team(40, 80, 'France') + team(40, 150, 'Spain', GOLD) + team(40, 250, 'England') + team(40, 320, 'Argentina', GOLD) +
        '<path d="M156 80 H186 V150 H156 M186 115 H214 M156 250 H186 V320 H156 M186 285 H214 M330 115 H356 V285 H330 M356 200 H380" fill="none" stroke="' + INK + '" stroke-width="2"/>' +
        '<path class="axa-draw" d="M156 150 H186 V115 H214" fill="none" stroke="' + CORAL + '" stroke-width="4" pathLength="1" stroke-linecap="round"/>' +
        team(214, 115, 'Spain') + team(214, 285, 'Argentina') +
        card(380, 60, 190, 170) + txt(398, 88, 'TITLE ODDS · FINAL', 11, 'letter-spacing="1.5" opacity=".6"') +
        odds.map((o, i) => txt(398, 124 + i * 50, o[0], 13) + '<rect class="axa-growx" style="--d:' + (0.5 + i * 0.25) + 's" x="398" y="' + (132 + i * 50) + '" width="' + (o[1] * 1.9) + '" height="14" rx="7" fill="' + o[2] + '" stroke="' + INK + '" stroke-width="1.5"/>' + txt(530, 124 + i * 50, o[1] + '%', 13, 'font-weight="700"')).join('') +
        '<g class="axa-pop" style="--d:1.4s">' + card(380, 250, 190, 60, CORAL) + txt(398, 286, '4 / 5 calls correct', 16, 'font-weight="700"') + '</g>' +
        '<g class="axa-bounce"><circle cx="475" cy="345" r="20" fill="#fff" stroke="' + INK + '" stroke-width="2"/><path d="M475 333 L485 341 L481 353 L469 353 L465 341 Z" fill="' + INK + '"/></g>',
        'World Cup bracket with Spain advancing, title odds bars and a bouncing football');
    }
  };
  function art(key) { return (ART[key] || ART.fraud)(); }

  /* ════════════════════════════════════════════════════════════════════
     helpers
     ════════════════════════════════════════════════════════════════════ */
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const ARROW = '<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M4 12 L12 4 M5 4 H12 V11" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const GH = '<svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true"><path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>';
  const PLAY = '<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M6.5 5.2 L11 8 L6.5 10.8 Z" fill="currentColor"/></svg>';

  function fmt(m, val) {
    if (m.raw != null && val === m.v) return (m.pre || '') + m.raw + (m.suf || '');
    const n = m.d ? val.toFixed(m.d) : Math.round(val).toLocaleString('en-IN');
    return (m.pre || '') + n + (m.suf || '');
  }
  function metricHTML(m, cls) {
    return '<div class="' + (cls || 'ax-metric') + '"><span class="ax-count" data-v="' + m.v + '" data-d="' + (m.d || 0) + '" data-pre="' + esc(m.pre || '') + '" data-suf="' + esc(m.suf || '') + '"' + (m.raw != null ? ' data-raw="' + esc(m.raw) + '"' : '') + '>' + esc(fmt(m, m.v)) + '</span><span class="ax-metric-label">' + esc(m.label) + '</span></div>';
  }
  function linkButtons(p, compact) {
    let h = '';
    if (!compact) h += '';
    if (p.live) h += '<a class="ax-btn ax-btn--solid" href="' + p.live + '" target="_blank" rel="noopener">' + PLAY + '<span>' + esc(p.liveLabel || 'Live demo') + '</span></a>';
    if (p.github) h += '<a class="ax-btn" href="' + p.github + '" target="_blank" rel="noopener">' + GH + '<span>GitHub</span></a>';
    return h;
  }

  /* ── count-up: animates every .ax-count once it scrolls into view ── */
  const reduce = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  function countUp(el) {
    if (el.dataset.done) return; el.dataset.done = '1';
    const v = parseFloat(el.dataset.v), d = +el.dataset.d || 0, pre = el.dataset.pre || '', suf = el.dataset.suf || '';
    const m = { v, d, pre, suf, raw: el.dataset.raw };
    if (reduce() || !v) { el.textContent = fmt(m, v); return; }
    const t0 = performance.now(), dur = 1400;
    (function tick(t) {
      const k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3);
      el.textContent = fmt(m, k < 1 ? v * e : v);
      if (k < 1) requestAnimationFrame(tick);
    })(t0);
  }
  let io = null;
  function observe(root) {
    if (!('IntersectionObserver' in window)) {
      root.querySelectorAll('.ax-count').forEach(countUp);
      root.querySelectorAll('.ax-in').forEach(el => el.classList.add('is-in'));
      return;
    }
    if (!io) io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        const el = en.target;
        if (el.classList.contains('ax-count')) countUp(el); else el.classList.add('is-in');
        io.unobserve(el);
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -6% 0px' });
    root.querySelectorAll('.ax-count, .ax-in').forEach(el => io.observe(el));
  }

  /* ════════════════════════════════════════════════════════════════════
     PROJECT VIEW — /work/<slug>
     ════════════════════════════════════════════════════════════════════ */
  function renderProject(slug) {
    const view = document.getElementById('project-view');
    const p = BY_SLUG[slug];
    if (!view || !p) return false;
    if (view.dataset.slug === slug) return true;
    view.dataset.slug = slug;
    const next = PROJECTS[(p.index + 1) % PROJECTS.length];
    const steps = p.steps.map((s, i) =>
      '<li class="pv-step ax-in" style="--i:' + i + '"><span class="pv-step-n">' + String(i + 1).padStart(2, '0') + '</span><div><h4>' + esc(s.t) + '</h4><p>' + esc(s.d) + '</p></div></li>').join('');
    const bars = p.bars ? '<div class="pv-bars ax-in"><p class="pv-label">' + esc(p.bars.title) + '</p>' +
      p.bars.items.map((b, i) => '<div class="pv-bar"><span class="pv-bar-k">' + esc(b[0]) + '</span><span class="pv-bar-track"><span class="pv-bar-fill" style="--w:' + (b[1] / p.bars.max * 100).toFixed(1) + '%;--i:' + i + '"></span></span><span class="pv-bar-v">' + b[1] + (p.bars.unit || '') + '</span></div>').join('') +
      (p.barsNote ? '<p class="pv-note">' + esc(p.barsNote) + '</p>' : '') + '</div>' : '';

    view.innerHTML =
      '<article class="pv" aria-labelledby="pv-title">' +
        '<section class="pv-hero">' +
          '<div class="pv-hero-copy">' +
            '<p class="pv-kicker ax-in">' + String(p.index + 1).padStart(2, '0') + ' / ' + String(PROJECTS.length).padStart(2, '0') + ' &nbsp;·&nbsp; ' + esc(p.kicker) + '</p>' +
            '<h1 class="pv-title ax-in" id="pv-title">' + esc(p.title) + '</h1>' +
            '<p class="pv-lede ax-in">' + esc(p.short) + '</p>' +
            '<div class="pv-actions ax-in">' + linkButtons(p) + '</div>' +
            '<dl class="pv-meta ax-in"><div><dt>Year</dt><dd>' + esc(p.year) + '</dd></div><div><dt>Role</dt><dd>' + esc(p.role) + '</dd></div><div><dt>Area</dt><dd>' + p.cats.map(c => esc(CATS[c])).join(', ') + '</dd></div></dl>' +
          '</div>' +
          '<div class="pv-hero-art ax-in">' + art(p.art) + '</div>' +
        '</section>' +

        '<section class="pv-band pv-dark"><div class="pv-wrap">' +
          '<p class="pv-label">At a glance</p>' +
          '<div class="pv-metrics">' + p.metrics.map(m => metricHTML(m, 'ax-metric ax-in')).join('') + '</div>' +
        '</div></section>' +

        '<section class="pv-band"><div class="pv-wrap pv-two">' +
          '<div class="ax-in"><p class="pv-label">01 · The problem</p><h2 class="pv-h2">Why this <i>mattered</i></h2></div>' +
          '<div class="ax-in"><p class="pv-body">' + esc(p.problem) + '</p>' +
          '<div class="pv-simple"><span class="pv-simple-tag">In simple words</span><p>' + esc(p.simple) + '</p></div></div>' +
        '</div></section>' +

        '<section class="pv-band pv-sand"><div class="pv-wrap">' +
          '<p class="pv-label ax-in">02 · The approach</p><h2 class="pv-h2 ax-in">How I <i>built it</i>, step by step</h2>' +
          '<ol class="pv-steps">' + steps + '</ol>' +
        '</div></section>' +

        '<section class="pv-band"><div class="pv-wrap' + (p.bars ? ' pv-two' : '') + '">' +
          '<div class="ax-in"><p class="pv-label">03 · Tools</p><h2 class="pv-h2">The <i>stack</i></h2>' +
            '<ul class="pv-stack">' + p.stack.map(s => '<li>' + esc(s) + '</li>').join('') + '</ul></div>' +
          (bars ? '<div>' + bars + '</div>' : '') +
        '</div></section>' +

        '<section class="pv-band pv-dark pv-quote"><div class="pv-wrap ax-in">' +
          '<p class="pv-label">04 · What I learned</p><blockquote>' + esc(p.learned) + '</blockquote>' +
        '</div></section>' +

        '<section class="pv-band pv-next"><div class="pv-wrap">' +
          '<p class="pv-label ax-in">Next project</p>' +
          '<a class="pv-next-card ax-in" href="/work/' + next.slug + '">' +
            '<div class="pv-next-art">' + art(next.art) + '</div>' +
            '<div class="pv-next-copy"><h2 class="pv-h2">' + esc(next.title) + '</h2><p>' + esc(next.short) + '</p><span class="ax-link">Read case study ' + ARROW + '</span></div>' +
          '</a>' +
          '<p class="pv-all ax-in"><a class="ax-link" href="/#projects">See all ' + PROJECTS.length + ' projects ' + ARROW + '</a></p>' +
        '</div></section>' +
      '</article>';
    observe(view);
    return true;
  }

  /* ════════════════════════════════════════════════════════════════════
     HOME COMPONENTS (static markup lives in index.html; this wires it up)
     ════════════════════════════════════════════════════════════════════ */
  function projectCard(p) {
    return '<article class="ax-pcard ax-in" data-cats="' + p.cats.join(' ') + '">' +
      '<a class="ax-pcard-art" href="/work/' + p.slug + '" aria-label="Read the ' + esc(p.title) + ' case study">' + art(p.art) + '</a>' +
      '<div class="ax-pcard-body">' +
        '<p class="ax-pcard-kicker">' + esc(p.kicker) + '</p>' +
        '<h3 class="ax-pcard-title"><a href="/work/' + p.slug + '">' + esc(p.title) + '</a></h3>' +
        '<p class="ax-pcard-short">' + esc(p.short) + '</p>' +
        '<p class="ax-pcard-metric"><strong>' + esc(fmt(p.metrics[0], p.metrics[0].v)) + '</strong> ' + esc(p.metrics[0].label) + '</p>' +
        '<ul class="ax-tags">' + p.stack.slice(0, 5).map(s => '<li>' + esc(s) + '</li>').join('') + '</ul>' +
        '<div class="ax-pcard-actions"><a class="ax-btn ax-btn--solid" href="/work/' + p.slug + '"><span>Case study</span>' + ARROW + '</a>' + linkButtons(p, true) + '</div>' +
      '</div></article>';
  }

  function initExplorer() {
    const grid = document.getElementById('ax-grid');
    const bar = document.getElementById('ax-filters');
    if (!grid || !bar) return;
    grid.innerHTML = PROJECTS.map(projectCard).join('');
    const counts = { all: PROJECTS.length };
    PROJECTS.forEach(p => p.cats.forEach(c => { counts[c] = (counts[c] || 0) + 1; }));
    bar.innerHTML = [['all', 'All projects']].concat(Object.keys(CATS).map(k => [k, CATS[k]]))
      .map(([k, l], i) => '<button type="button" class="ax-chip' + (i ? '' : ' is-on') + '" data-f="' + k + '" aria-pressed="' + (i ? 'false' : 'true') + '">' + esc(l) + '<span>' + counts[k] + '</span></button>').join('');
    bar.addEventListener('click', (e) => {
      const b = e.target.closest('.ax-chip'); if (!b) return;
      bar.querySelectorAll('.ax-chip').forEach(x => { x.classList.toggle('is-on', x === b); x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      const f = b.dataset.f;
      grid.querySelectorAll('.ax-pcard').forEach((c, i) => {
        const show = f === 'all' || c.dataset.cats.split(' ').includes(f);
        c.classList.toggle('is-hidden', !show);
        if (show) { c.classList.remove('is-in'); void c.offsetWidth; c.style.setProperty('--i', i % 3); c.classList.add('is-in'); }
      });
      window.dispatchEvent(new Event('resize'));   // the sticky section re-measures its height
    });
    observe(grid);
  }

  /* featured home tiles: swap the video mock-ups for each project's art */
  function initTiles() {
    // tiles are much taller than the art, so letterbox (meet) on the art's own backdrop
    document.querySelectorAll('[data-ax-tile]').forEach(el => {
      const html = art(el.dataset.axTile);
      const bg = (html.match(/<rect width="600" height="400" fill="([^"]+)"/) || [])[1];
      el.innerHTML = html.replace('xMidYMid slice', 'xMidYMid meet');
      if (bg) el.style.background = bg;
    });
  }

  /* build-process pipeline: the connecting line fills as the section scrolls */
  function initPipeline() {
    const sec = document.getElementById('ax-process');
    if (!sec) return;
    const fill = sec.querySelector('.ax-pipe-fill');
    const steps = Array.from(sec.querySelectorAll('.ax-pipe-step'));
    function upd() {
      const r = (window.Scroll ? Scroll.rect(sec) : sec.getBoundingClientRect());
      const vh = window.innerHeight;
      const k = Math.max(0, Math.min(1, (vh * 0.75 - r.top) / (r.height * 0.8)));
      if (fill) fill.style.setProperty('--k', k.toFixed(3));
      steps.forEach((s, i) => s.classList.toggle('is-lit', k >= (i + 0.3) / steps.length));
    }
    if (window.Scroll) Scroll.add(upd); else addEventListener('scroll', upd, { passive: true });
    // tapping a step shows its detail (keyboard + touch friendly)
    steps.forEach(s => s.addEventListener('click', () => {
      steps.forEach(x => x.classList.toggle('is-open', x === s && !s.classList.contains('is-open')));
    }));
    upd();
  }

  /* journey timeline progress line */
  function initJourney() {
    const tl = document.getElementById('ax-timeline');
    if (!tl) return;
    const line = tl.querySelector('.ax-tl-line');
    function upd() {
      const r = (window.Scroll ? Scroll.rect(tl) : tl.getBoundingClientRect());
      const k = Math.max(0, Math.min(1, (window.innerHeight * 0.6 - r.top) / r.height));
      line.style.setProperty('--k', k.toFixed(3));
    }
    if (window.Scroll) Scroll.add(upd); else addEventListener('scroll', upd, { passive: true });
    upd();
  }

  /* skill chips: hovering/focusing a skill lists the projects that use it */
  function initSkills() {
    const box = document.getElementById('ax-skills');
    if (!box) return;
    const out = document.getElementById('ax-skill-used');
    const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
    function show(chip) {
      const key = norm(chip.dataset.k || chip.textContent);
      const used = PROJECTS.filter(p => p.stack.some(s => norm(s).includes(key) || key.includes(norm(s))));
      box.querySelectorAll('.ax-skill').forEach(c => c.classList.toggle('is-on', c === chip));
      out.innerHTML = used.length
        ? '<strong>' + esc(chip.textContent) + '</strong> is used in: ' + used.map(p => '<a href="/work/' + p.slug + '">' + esc(p.title.split(' — ')[0]) + '</a>').join(', ')
        : '<strong>' + esc(chip.textContent) + '</strong> — part of my day-to-day toolkit.';
    }
    box.addEventListener('mouseover', (e) => { const c = e.target.closest('.ax-skill'); if (c) show(c); });
    box.addEventListener('focusin', (e) => { const c = e.target.closest('.ax-skill'); if (c) show(c); });
    box.addEventListener('click', (e) => { const c = e.target.closest('.ax-skill'); if (c) show(c); });
  }

  /* reading-progress bar + back-to-top */
  function initChrome() {
    const bar = document.createElement('div');
    bar.className = 'ax-progress'; bar.setAttribute('aria-hidden', 'true');
    document.body.appendChild(bar);
    const top = document.createElement('button');
    top.type = 'button'; top.className = 'ax-top'; top.setAttribute('aria-label', 'Back to top');
    top.innerHTML = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M12 19 V5 M6 11 L12 5 L18 11" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    top.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduce() ? 'instant' : 'smooth' }));
    document.body.appendChild(top);
    function upd() {
      const y = window.scrollY, h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = 'scaleX(' + (h > 0 ? Math.min(1, y / h) : 0).toFixed(4) + ')';
      top.classList.toggle('is-on', y > window.innerHeight * 1.2);
      top.classList.toggle('is-raised', h - y < 140);
    }
    addEventListener('scroll', upd, { passive: true });
    addEventListener('resize', upd, { passive: true });
    upd();
  }

  /* hero terminal: types a short "run" of each real project, then loops */
  function initTerminal() {
    const el = document.getElementById('ax-term');
    if (!el) return;
    const RUNS = [
      [['$', 'python train.py --model xgboost --smote'], ['ok', '✓ AUC-PR 0.9752 · recall 87.5% · FP 0.152%'], ['$', 'docker build -t fraud-api . && deploy'], ['ok', '✓ live on Render → /predict 200 OK']],
      [['$', 'python finetune.py mistral-7b --lora --4bit'], ['dim', '  ablation: LoRA rank 4 · 8 · 16 · 32 · 64'], ['ok', '✓ best rank 16 · training memory −75%']],
      [['$', 'psql -f cohort_retention.sql'], ['dim', '  540K+ transactions · CTEs · window functions'], ['ok', '✓ critical churn window → Month 3']],
      [['$', 'node simulate.js --bracket wc2026 --runs 20000'], ['dim', '  Elo ratings → win probability → Monte Carlo'], ['ok', '✓ 4 of 5 knockout calls correct · Spain 64%']],
      [['$', 'streamlit run screening_app.py'], ['dim', '  OCR → MRZ check → ELA → face match → score'], ['ok', '✓ verdict: FLAG (tampered region found)']]
    ];
    const line = (l) => l[0] === '$' ? '<span class="c">$</span> ' + esc(l[1]) : '<span class="' + l[0] + '">' + esc(l[1]) + '</span>';
    if (reduce()) { el.innerHTML = RUNS[0].map(line).join('\n'); return; }
    let r = 0;
    function play() {
      const run = RUNS[r++ % RUNS.length];
      const done = [];
      let i = 0;
      (function nextLine() {
        if (i >= run.length) { el.innerHTML = done.join('\n') + '\n<span class="cur"></span>'; setTimeout(play, 2600); return; }
        const l = run[i++];
        if (l[0] !== '$') { setTimeout(() => { done.push(line(l)); el.innerHTML = done.join('\n'); nextLine(); }, 420); return; }
        let k = 0;
        (function type() {
          el.innerHTML = done.concat('<span class="c">$</span> ' + esc(l[1].slice(0, k)) + '<span class="cur"></span>').join('\n');
          if (k++ < l[1].length) setTimeout(type, 28); else { done.push(line(l)); setTimeout(nextLine, 260); }
        })();
      })();
    }
    play();
  }

  /* footer: live Delhi time, copy-email feedback, signature that draws itself */
  function initFooter(tries) {
    const time = document.getElementById('ft-time');
    if (!time) { if ((tries || 0) < 40) setTimeout(() => initFooter((tries || 0) + 1), 100); return; }
    const fmtTime = new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: true });
    const tick = () => { time.textContent = fmtTime.format(new Date()).toUpperCase(); };
    tick(); setInterval(tick, 20000);

    const copy = document.getElementById('ft-copy');
    if (copy) copy.addEventListener('click', async () => {
      const label = copy.querySelector('.ft-copy-label');
      const email = copy.dataset.email;
      try { await navigator.clipboard.writeText(email); label.textContent = 'Copied ✓'; }
      catch (e) { window.location.href = 'mailto:' + email; return; }
      copy.classList.add('is-done');
      setTimeout(() => { label.textContent = 'Copy email'; copy.classList.remove('is-done'); }, 1800);
    });

    const sign = document.querySelector('.ft-sign');
    if (sign && 'IntersectionObserver' in window) {
      new IntersectionObserver((es, o) => es.forEach(e => {
        if (e.isIntersecting) { sign.classList.add('is-drawn'); o.disconnect(); }
      }), { threshold: 0.6 }).observe(sign);
    } else if (sign) sign.classList.add('is-drawn');
  }

  /* live CodeChef numbers: data/codechef.json is refreshed every 6 hours by a
     GitHub Action; the markup ships with the last known values as a fallback */
  function initCodeChef() {
    if (!document.querySelector('[data-cc]')) return;
    fetch('/data/codechef.json', { cache: 'no-cache' })
      .then(r => (r.ok ? r.json() : null))
      .then(d => {
        if (!d) return;
        const get = (path) => path.split('.').reduce((o, k) => (o == null ? o : o[k]), d);
        document.querySelectorAll('[data-cc]').forEach(el => {
          const v = get(el.dataset.cc);
          if (v == null) return;
          if (el.classList.contains('ax-count')) {
            el.dataset.v = v;
            if (el.dataset.done || !('IntersectionObserver' in window)) el.textContent = Math.round(v).toLocaleString('en-IN');
          } else el.textContent = typeof v === 'number' && v >= 1000 && !/rating|highest/.test(el.dataset.cc) ? v.toLocaleString('en-IN') : v;
        });
        const stars = get('codechef.stars');
        document.querySelectorAll('[data-cc-stars]').forEach(el => { if (stars) el.textContent = '★'.repeat(stars); });
        document.querySelectorAll('[data-cc-prov]').forEach(el => { el.hidden = !get(el.dataset.ccProv + '.provisional'); });
        const upd = d.updated && new Date(d.updated);
        if (upd && !isNaN(upd)) {
          const h = Math.max(0, Math.round((Date.now() - upd) / 36e5));
          const ago = h < 1 ? 'just now' : h < 48 ? h + ' h ago' : Math.round(h / 24) + ' days ago';
          document.querySelectorAll('[data-cc-updated]').forEach(el => { el.textContent = 'synced ' + ago; });
        }
      })
      .catch(() => {});
  }

  function initHome() {
    initTiles();
    initExplorer();
    initPipeline();
    initJourney();
    initSkills();
    initTerminal();
    initFooter();
    initCodeChef();
    initChrome();
    observe(document);
    // the sticky #work section measured its height before the JS content landed
    requestAnimationFrame(() => window.dispatchEvent(new Event('resize')));
  }

  window.AX = { LINKS, PROJECTS, BY_SLUG, CATS, art, renderProject, observe };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initHome);
  else initHome();
})();
