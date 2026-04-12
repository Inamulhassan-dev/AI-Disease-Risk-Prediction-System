import os

import joblib
import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler


BASE_DIR = os.path.dirname(os.path.abspath(__file__))
RNG = np.random.default_rng(42)


def save_model(name, x_data, y_data):
    scaler = StandardScaler()
    x_scaled = scaler.fit_transform(x_data)
    model = LogisticRegression(max_iter=2000, random_state=42)
    model.fit(x_scaled, y_data)

    joblib.dump(model, os.path.join(BASE_DIR, f"{name}_model.pkl"))
    joblib.dump(scaler, os.path.join(BASE_DIR, f"{name}_scaler.pkl"))
    print(f"Saved {name} model and scaler")


def make_liver(n=1200):
    age = RNG.integers(18, 91, n)
    bilirubin = RNG.uniform(0.1, 3.2, n)
    alt = RNG.uniform(7, 90, n)
    ast = RNG.uniform(10, 85, n)
    albumin = RNG.uniform(2.5, 5.8, n)
    alkphos = RNG.uniform(40, 260, n)

    score = 0.02 * age + 0.8 * bilirubin + 0.015 * alt + 0.015 * ast - 0.7 * albumin + 0.004 * alkphos
    y = (score > np.percentile(score, 55)).astype(int)
    x = np.column_stack([age, bilirubin, alt, ast, albumin, alkphos])
    return x, y


def make_stroke(n=1200):
    age = RNG.integers(18, 96, n)
    avg_glucose = RNG.uniform(60, 280, n)
    bmi = RNG.uniform(15, 50, n)
    hypertension = RNG.integers(0, 2, n)
    heart_disease = RNG.integers(0, 2, n)
    smoking = RNG.integers(0, 3, n)

    score = 0.03 * age + 0.01 * avg_glucose + 0.03 * bmi + 1.1 * hypertension + 1.2 * heart_disease + 0.3 * smoking
    y = (score > np.percentile(score, 62)).astype(int)
    x = np.column_stack([age, avg_glucose, bmi, hypertension, heart_disease, smoking])
    return x, y


def make_hypertension(n=1200):
    age = RNG.integers(18, 91, n)
    sys_bp = RNG.uniform(90, 210, n)
    dia_bp = RNG.uniform(60, 130, n)
    bmi = RNG.uniform(15, 50, n)
    sodium = RNG.uniform(120, 160, n)
    stress = RNG.uniform(0, 10, n)

    score = 0.03 * age + 0.035 * sys_bp + 0.04 * dia_bp + 0.03 * bmi + 0.02 * sodium + 0.35 * stress
    y = (score > np.percentile(score, 57)).astype(int)
    x = np.column_stack([age, sys_bp, dia_bp, bmi, sodium, stress])
    return x, y


def make_thyroid(n=1200):
    age = RNG.integers(18, 91, n)
    tsh = RNG.uniform(0.2, 15, n)
    t3 = RNG.uniform(0.5, 4.5, n)
    t4 = RNG.uniform(3, 17, n)
    weight_change = RNG.uniform(-10, 10, n)
    fatigue = RNG.uniform(0, 10, n)

    score = 0.01 * age + 0.32 * tsh - 0.45 * t3 - 0.08 * t4 + 0.08 * np.abs(weight_change) + 0.35 * fatigue
    y = (score > np.percentile(score, 58)).astype(int)
    x = np.column_stack([age, tsh, t3, t4, weight_change, fatigue])
    return x, y


def make_pcos(n=1200):
    age = RNG.integers(15, 46, n)
    bmi = RNG.uniform(15, 50, n)
    cycle_irregular = RNG.integers(0, 2, n)
    insulin = RNG.uniform(2, 40, n)
    testosterone = RNG.uniform(5, 130, n)
    acne = RNG.integers(0, 4, n)

    score = 0.02 * age + 0.05 * bmi + 1.2 * cycle_irregular + 0.05 * insulin + 0.02 * testosterone + 0.4 * acne
    y = (score > np.percentile(score, 59)).astype(int)
    x = np.column_stack([age, bmi, cycle_irregular, insulin, testosterone, acne])
    return x, y


if __name__ == "__main__":
    generators = {
        "liver": make_liver,
        "stroke": make_stroke,
        "hypertension": make_hypertension,
        "thyroid": make_thyroid,
        "pcos": make_pcos
    }

    for disease, fn in generators.items():
        features, labels = fn()
        save_model(disease, features, labels)
