from flask import Flask, request, jsonify
import joblib
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def get_float(v):
    if v is None or v == "":
        return 0.0
    return float(v)

def risk_label(p):
    if p < 30:
        return "Low Risk"
    elif p < 60:
        return "Moderate Risk"
    return "High Risk"

# Load models
diabetes_model = joblib.load("../model/diabetes_model.pkl")
diabetes_scaler = joblib.load("../model/diabetes_scaler.pkl")

heart_model = joblib.load("../model/heart_model.pkl")
heart_scaler = joblib.load("../model/heart_scaler.pkl")

kidney_model = joblib.load("../model/kidney_model.pkl")
kidney_scaler = joblib.load("../model/kidney_scaler.pkl")

@app.route("/api/diabetes", methods=["POST"])
def diabetes():
    data = request.json
    inputs = [
        get_float(data.get("pregnancies")),
        get_float(data.get("glucose")),
        get_float(data.get("bloodpressure")),
        get_float(data.get("skinthickness")),
        get_float(data.get("insulin")),
        get_float(data.get("bmi")),
        get_float(data.get("dpf")),
        get_float(data.get("age"))
    ]
    X = diabetes_scaler.transform(np.array(inputs).reshape(1, -1))
    prob = diabetes_model.predict_proba(X)[0][1] * 100
    return jsonify({
        "risk": risk_label(prob),
        "probability": round(prob, 2),
        "inputs": data
    })

@app.route("/api/heart", methods=["POST"])
def heart():
    data = request.json
    inputs = [
        get_float(data.get("age")),
        get_float(data.get("sex")),
        get_float(data.get("cp")),
        get_float(data.get("trestbps")),
        get_float(data.get("chol")),
        get_float(data.get("thalach")),
        get_float(data.get("fbs"))
    ]
    X = heart_scaler.transform(np.array(inputs).reshape(1, -1))
    prob = heart_model.predict_proba(X)[0][1] * 100
    return jsonify({
        "risk": risk_label(prob),
        "probability": round(prob, 2),
        "inputs": data
    })

@app.route("/api/kidney", methods=["POST"])
def kidney():
    data = request.json
    inputs = [
        get_float(data.get("age")),
        get_float(data.get("bp")),
        get_float(data.get("sg")),
        get_float(data.get("al")),
        get_float(data.get("su")),
        get_float(data.get("bgr")),
        get_float(data.get("sc")),
        get_float(data.get("hemo"))
    ]
    X = kidney_scaler.transform(np.array(inputs).reshape(1, -1))
    prob = kidney_model.predict_proba(X)[0][1] * 100
    return jsonify({
        "risk": risk_label(prob),
        "probability": round(prob, 2),
        "inputs": data
    })

if __name__ == "__main__":
    app.run(debug=True)
