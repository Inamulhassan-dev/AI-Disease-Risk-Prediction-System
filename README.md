# AI Disease Risk Prediction System

Production-style full-stack health risk platform with multi-disease predictions, explainability, guided forms, user accounts, report history, doctor dashboard, model quality page, and one-click setup/start/stop scripts for Windows.

## Simple Overview (For Beginners)

This project predicts disease risk from medical input values.

In simple words:

- You enter health/lab values in a form.
- The AI model calculates a risk percentage.
- You get a risk label (Low / Moderate / High).
- You also see why the result happened (explainability section).
- You can save, track, and export reports as PDF.

This is a decision-support app for learning and assistance, not a replacement for a real doctor diagnosis.

## Quick Start (2 Minutes)

If you are new, follow only these 3 steps:

1. Run `1_SETUP_PROJECT.bat`
2. Run `2_START_PROJECT.bat`
3. Open `http://localhost:3001`

When done, run `3_STOP_PROJECT.bat`.

That is all.

## What This Project Includes

- Multi-disease prediction modules:
  - Diabetes, Heart, Kidney
  - Liver, Stroke, Hypertension, Thyroid, PCOS
- User system:
  - Signup/login
  - Save reports to history
  - Trends view over time
- Explainability:
  - SHAP and LIME-based feature explanations (with safe fallback)
- PDF reports:
  - Chart + timestamp + doctor notes + multilingual labels
- Doctor tools:
  - Patient report view
  - Patient-vs-cohort comparison
  - CSV export from doctor dashboard
- Model quality page:
  - Accuracy, Precision, Recall, ROC-AUC, Version
- Security baseline:
  - JWT auth
  - API rate limiting
  - Audit logs
  - Encrypted report payload storage
- Deployment assets:
  - Dockerfile
  - docker-compose.yml
  - Render config
  - Netlify config
  - GitHub Actions CI workflow
  - AWS deployment guide

## Tech Stack

- Frontend: React, React Router, Chart.js, html2canvas, jsPDF
- Backend: Flask, Flask-CORS
- ML/Data: scikit-learn, NumPy, pandas, joblib, SHAP, LIME
- Auth/Security: PyJWT

## Project Structure

```
AI-Disease-Risk-Prediction-System/
├─ app/
│  ├─ app.py
│  └─ data/                   # runtime storage (ignored by git)
├─ dataset/
├─ medical-dashboard/
│  ├─ src/
│  └─ netlify.toml
├─ model/
│  ├─ *.pkl
│  ├─ train_model.py
│  ├─ train_heart.py
│  ├─ train_kidney.py
│  └─ train_additional_models.py
├─ .github/workflows/ci.yml
├─ Dockerfile
├─ docker-compose.yml
├─ render.yaml
├─ aws-deploy.md
├─ 1_SETUP_PROJECT.bat
├─ 2_START_PROJECT.bat
├─ 3_STOP_PROJECT.bat
└─ README.md
```

## One-Click Local Usage (Windows)

### 1) Setup once

Run:

```
1_SETUP_PROJECT.bat
```

This script automatically:

- checks Python / Node / npm
- if Python or Node is missing, it asks permission and installs using `winget`
- creates `venv`
- installs all backend dependencies
- installs frontend dependencies
- writes `medical-dashboard/.env` with API base URL

If setup fails, usually one of these is the reason:

- Internet connection issue
- Python/Node installation still not in PATH (restart terminal and run setup again)
- Corporate/admin restrictions on package install

### 2) Start project

Run:

```
2_START_PROJECT.bat
```

Starts:

- Backend: `http://127.0.0.1:5001`
- Frontend: `http://localhost:3001`

It opens backend and frontend in separate terminal windows.

### 3) Stop project

Run:

```
3_STOP_PROJECT.bat
```

Stops frontend/backend processes on ports `3001` and `5001`.

## What Each BAT File Does

### `1_SETUP_PROJECT.bat`

- prepares everything for first run
- installs Python dependencies with pip
- installs frontend dependencies with npm
- creates config needed by frontend

Use this once after cloning.

### `2_START_PROJECT.bat`

- starts Flask backend
- starts React frontend
- gives URLs to open in browser

Use this whenever you want to run the app.

### `3_STOP_PROJECT.bat`

- cleanly stops backend and frontend processes

Use this when your work is done.

## Manual Run (Optional)

### Backend

```powershell
cd app
..\venv\Scripts\python -c "import app as m; m.app.run(port=5001, debug=False)"
```

### Frontend

```powershell
cd medical-dashboard
npm start
```

## Requirements (for fresh machine)

- Python 3.10+
- Node.js 18+
- npm
- Internet connection for first install

Recommended:

- Windows 10/11
- 8GB RAM or more

## API Quick Reference

- `GET /api/health`
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/reports`
- `POST /api/reports`
- `GET /api/reports/trends`
- `GET /api/model-quality`
- `GET /api/doctor/patients` (doctor)
- `GET /api/doctor/compare` (doctor)
- `GET /api/doctor/patient-compare` (doctor)
- `POST /api/{disease}` for each module

## Demo Tip

Each disease form includes:

- `Use Healthy Sample`
- `Use High Risk Sample`

to auto-fill values instantly during presentations.

## Common Issues and Fixes

### 1) Blank page or old UI still showing

- Press `Ctrl + F5` for hard refresh.
- Ensure frontend is running on `http://localhost:3001`.

### 2) Model Quality page shows nothing

- Make sure backend is running on port `5001`.
- Open `http://127.0.0.1:5001/api/health` in browser. It should return status `ok`.

### 3) Prediction failed alert

- Check backend window for errors.
- Use sample buttons (`Use Healthy Sample` / `Use High Risk Sample`) to verify quickly.
- Ensure backend and frontend are from same latest code version.

### 4) Setup says python/node not found

- Allow install prompt in setup script.
- If installed just now, close terminal and run setup again.

## Notes

- Runtime data is saved in `app/data/` and excluded from git.
- If model page appears empty, ensure backend is running on `5001`.

## For Evaluators / Reviewers

If you are reviewing this project and want a fast demo:

1. Run setup and start scripts.
2. Open home page and pick any disease module.
3. Click sample button for instant auto-fill.
4. Submit and review:
   - risk score
   - explanation
   - recommendations
   - PDF export
5. Check:
   - History page
   - Trends page
   - Model Quality page
   - Doctor dashboard (doctor account)
