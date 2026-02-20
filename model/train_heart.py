import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier

# Load dataset
data = pd.read_csv("../dataset/heart.csv")

# Select ONLY numeric features used in the form
X = data[
    ["age", "sex", "cp", "trestbps", "chol", "thalach", "fbs"]
]

y = data["target"]

# Train-test split (important: stratify)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# Scaling
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# Train Random Forest (KEY FIX)
model = RandomForestClassifier(
    n_estimators=200,
    random_state=42,
    class_weight="balanced"
)

model.fit(X_train, y_train)

# Save model and scaler
joblib.dump(model, "heart_model.pkl")
joblib.dump(scaler, "heart_scaler.pkl")

print("✅ Heart disease model trained using Random Forest")
