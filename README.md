# AI Disease Risk Prediction System

Production-style full-stack health risk platform with multi-disease predictions, explainability, guided forms, user accounts, report history, doctor dashboard, model quality page, and one-click setup/start/stop scripts for Windows.

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
- creates `venv`
- installs all backend dependencies
- installs frontend dependencies
- writes `medical-dashboard/.env` with API base URL

### 2) Start project

Run:

```
2_START_PROJECT.bat
```

Starts:

- Backend: `http://127.0.0.1:5001`
- Frontend: `http://localhost:3001`

### 3) Stop project

Run:

```
3_STOP_PROJECT.bat
```

Stops frontend/backend processes on ports `3001` and `5001`.

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

## Notes

- Runtime data is saved in `app/data/` and excluded from git.
- If model page appears empty, ensure backend is running on `5001`.
