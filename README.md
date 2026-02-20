AI-Based Disease Risk Prediction System
📌 Project Overview

The AI-Based Disease Risk Prediction System is a web-based healthcare decision-support application that predicts the risk of Diabetes, Heart Disease, and Kidney Disease using machine learning models.

The system allows users to enter clinical parameters, visualizes risk using modern dashboards, explains why a risk is high or low, provides general lifestyle recommendations, and generates downloadable PDF reports.

This project demonstrates the practical use of Artificial Intelligence in healthcare, focusing on explainability, usability, and responsible predictions.

Objectives-

Predict disease risk using trained ML models
Provide explainable AI results (why the risk is high/low)
Guide users with input ranges and validation
Visualize results using modern UI dashboards
Generate PDF medical-style reports
Ensure the system is easy to use and educational

Diseases Covered

Diabetes Prediction
Glucose, BMI, insulin, age, blood pressure, etc.

Heart Disease Prediction
Chest pain type, cholesterol, BP, heart rate, blood sugar, etc.

Kidney Disease Prediction
Creatinine, hemoglobin, blood pressure, glucose, albumin, etc.

Frontend (React + Tailwind)
        ↓
   REST API (Flask)
        ↓
Machine Learning Models


Technologies Used

🔹 Frontend
React.js
Tailwind CSS
React Router DOM
html2canvas (PDF generation)
jsPDF (PDF creation)

🔹 Backend
Python
Flask
Flask-CORS

🔹 Machine Learning
scikit-learn
NumPy
Pandas
StandardScaler

Logistic Regression / Random Forest
🔹 Development Tools
Node.js & npm
VS Code
Git & GitHub

Required Libraries
Frontend (npm)
npm install react react-dom react-router-dom
npm install tailwindcss postcss autoprefixer
npm install jspdf html2canvas

Backend (pip)
pip install flask flask-cors
pip install numpy pandas scikit-learn


AI Medical/
│
├── app/                    # Flask backend
│   ├── app.py
│   ├── models/
│   └── utils/
│
├── medical-dashboard/      # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── ResultCard.js
│   │   │   ├── RiskGauge.js
│   │   │   ├── HelperInput.js
│   │   │   ├── ClinicalRecommendations.js
│   │   │   ├── DiabetesRiskExplanation.js
│   │   │   ├── HeartRiskExplanation.js
│   │   │   └── KidneyRiskExplanation.js
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Diabetes.js
│   │   │   ├── Heart.js
│   │   │   └── Kidney.js
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   │
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
│
├── model/                  # ML training scripts
│
├── dataset/                # CSV datasets
│
├── venv/                   # Python virtual environment
│
└── README.md

To run backend 

cd app
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt
python app.py

TO RUN FRONT END
cd medical-dashboard
npm install
npm start


