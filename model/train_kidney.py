import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier

# Load dataset
data = pd.read_csv("../dataset/kidney_disease.csv")

# Map target column
data["classification"] = data["classification"].map({
    "ckd": 1,
    "notckd": 0
})

# Drop missing values
data = data.dropna()

# Select numeric features (same as form)
X = data[
    ["age", "bp", "sg", "al", "su", "bgr", "sc", "hemo"]
]
y = data["classification"]

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# Scale features
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

# Save model & scaler
joblib.dump(model, "kidney_model.pkl")
joblib.dump(scaler, "kidney_scaler.pkl")

print("✅ Kidney model trained using Random Forest")
print("Class distribution:", y.value_counts().to_dict())
