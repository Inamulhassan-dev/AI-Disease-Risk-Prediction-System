export const diseaseForms = {
  diabetes: {
    title: "Diabetes Risk Assessment",
    endpoint: "/diabetes",
    samples: {
      healthy: {
        pregnancies: 1,
        glucose: 92,
        bloodpressure: 74,
        skinthickness: 20,
        insulin: 88,
        bmi: 22.4,
        dpf: 0.32,
        age: 29
      },
      highRisk: {
        pregnancies: 6,
        glucose: 182,
        bloodpressure: 102,
        skinthickness: 45,
        insulin: 255,
        bmi: 36.8,
        dpf: 1.42,
        age: 58
      }
    },
    fields: [
      { label: "Pregnancies", name: "pregnancies", hint: "Number of times pregnant", min: 0, max: 15, placeholder: "2", required: true },
      { label: "Glucose", name: "glucose", hint: "Normal fasting: 70-140", min: 70, max: 200, placeholder: "120", unit: "mg/dL", convert: { alt: "mmol/L", factor: 18 } },
      { label: "Blood Pressure", name: "bloodpressure", hint: "Normal: 60-90", min: 60, max: 120, placeholder: "80", unit: "mm Hg", required: true },
      { label: "Skin Thickness", name: "skinthickness", hint: "Typical: 10-50", min: 10, max: 60, placeholder: "20", unit: "mm" },
      { label: "Insulin", name: "insulin", hint: "Typical: 15-276", min: 15, max: 300, placeholder: "85", unit: "uU/mL" },
      { label: "BMI", name: "bmi", hint: "Normal: 18.5-24.9", min: 15, max: 50, placeholder: "27.5", required: true },
      { label: "Diabetes Pedigree Function", name: "dpf", hint: "Family history score", min: 0, max: 2.5, placeholder: "0.5" },
      { label: "Age", name: "age", hint: "Adult age: 18-90", min: 18, max: 90, placeholder: "45" }
    ]
  },
  heart: {
    title: "Heart Disease Risk Assessment",
    endpoint: "/heart",
    samples: {
      healthy: {
        age: 36,
        sex: 0,
        cp: 0,
        trestbps: 116,
        chol: 178,
        thalach: 172,
        fbs: 0
      },
      highRisk: {
        age: 67,
        sex: 1,
        cp: 3,
        trestbps: 156,
        chol: 286,
        thalach: 96,
        fbs: 1
      }
    },
    fields: [
      { label: "Age", name: "age", hint: "Adult age: 18-90", min: 18, max: 90, placeholder: "55" },
      { label: "Sex", name: "sex", hint: "1 = Male, 0 = Female", min: 0, max: 1, placeholder: "1" },
      { label: "Chest Pain Type", name: "cp", hint: "0: typical, 3: asymptomatic", min: 0, max: 3, placeholder: "2" },
      { label: "Resting Blood Pressure", name: "trestbps", hint: "Normal: 90-140", min: 80, max: 160, placeholder: "120", unit: "mm Hg" },
      { label: "Cholesterol", name: "chol", hint: "Normal: under 200", min: 150, max: 300, placeholder: "200", unit: "mg/dL", convert: { alt: "mmol/L", factor: 38.67 } },
      { label: "Max Heart Rate", name: "thalach", hint: "Typical: 70-200", min: 50, max: 300, placeholder: "160" },
      { label: "Fasting Blood Sugar", name: "fbs", hint: "1 if >120 mg/dL else 0", min: 0, max: 1, placeholder: "0" }
    ]
  },
  kidney: {
    title: "Kidney Disease Risk Assessment",
    endpoint: "/kidney",
    samples: {
      healthy: {
        age: 33,
        bp: 78,
        sg: 1.02,
        al: 0,
        su: 0,
        bgr: 106,
        sc: 0.9,
        hemo: 14.1
      },
      highRisk: {
        age: 64,
        bp: 148,
        sg: 1.01,
        al: 4,
        su: 3,
        bgr: 188,
        sc: 1.9,
        hemo: 10.8
      }
    },
    fields: [
      { label: "Age", name: "age", hint: "Adult age: 18-90", min: 18, max: 90, placeholder: "50" },
      { label: "Blood Pressure", name: "bp", hint: "Normal: 60-90", min: 70, max: 160, placeholder: "80", unit: "mm Hg" },
      { label: "Specific Gravity", name: "sg", hint: "Normal: 1.005-1.030", min: 1.0, max: 2.0, placeholder: "1.020" },
      { label: "Albumin", name: "al", hint: "0 = normal, 5 = high", min: 0, max: 10, placeholder: "0" },
      { label: "Sugar", name: "su", hint: "0 = normal, 5 = high", min: 0, max: 10, placeholder: "0" },
      { label: "Blood Glucose Random", name: "bgr", hint: "Normal: 70-140", min: 70, max: 200, placeholder: "120", unit: "mg/dL", convert: { alt: "mmol/L", factor: 18 } },
      { label: "Serum Creatinine", name: "sc", hint: "Normal: 0.6-1.3", min: 0.3, max: 2.0, placeholder: "1.2", unit: "mg/dL", convert: { alt: "umol/L", factor: 0.0113 } },
      { label: "Hemoglobin", name: "hemo", hint: "Normal: 12-17", min: 10, max: 25, placeholder: "13", unit: "g/dL" }
    ]
  },
  liver: {
    title: "Liver Disease Risk Assessment",
    endpoint: "/liver",
    samples: {
      healthy: {
        age: 34,
        bilirubin: 0.7,
        alt: 24,
        ast: 22,
        albumin: 4.4,
        alkphos: 94
      },
      highRisk: {
        age: 59,
        bilirubin: 2.6,
        alt: 78,
        ast: 66,
        albumin: 3.1,
        alkphos: 198
      }
    },
    fields: [
      { label: "Age", name: "age", hint: "Adult age: 18-90", min: 18, max: 90, placeholder: "45" },
      { label: "Bilirubin", name: "bilirubin", hint: "Normal: 0.1-1.2", min: 0.1, max: 3.0, placeholder: "1.0", unit: "mg/dL" },
      { label: "ALT", name: "alt", hint: "Normal: 7-56", min: 7, max: 56, placeholder: "35", unit: "U/L" },
      { label: "AST", name: "ast", hint: "Normal: 10-40", min: 10, max: 40, placeholder: "28", unit: "U/L" },
      { label: "Albumin", name: "albumin", hint: "Normal: 3.2-5.5", min: 3.2, max: 5.5, placeholder: "4.1", unit: "g/dL" },
      { label: "Alkaline Phosphatase", name: "alkphos", hint: "Normal: 44-147", min: 44, max: 147, placeholder: "95", unit: "U/L" }
    ]
  },
  stroke: {
    title: "Stroke Risk Assessment",
    endpoint: "/stroke",
    samples: {
      healthy: {
        age: 31,
        avg_glucose: 98,
        bmi: 23.1,
        hypertension: 0,
        heart_disease: 0,
        smoking: 0
      },
      highRisk: {
        age: 72,
        avg_glucose: 226,
        bmi: 34.9,
        hypertension: 1,
        heart_disease: 1,
        smoking: 2
      }
    },
    fields: [
      { label: "Age", name: "age", hint: "Adult age: 18-95", min: 18, max: 95, placeholder: "60" },
      { label: "Average Glucose", name: "avg_glucose", hint: "Typical: 60-250", min: 60, max: 250, placeholder: "140", unit: "mg/dL", convert: { alt: "mmol/L", factor: 18 } },
      { label: "BMI", name: "bmi", hint: "Normal: 18.5-24.9", min: 15, max: 50, placeholder: "28" },
      { label: "Hypertension", name: "hypertension", hint: "0 = No, 1 = Yes", min: 0, max: 1, placeholder: "1" },
      { label: "Heart Disease", name: "heart_disease", hint: "0 = No, 1 = Yes", min: 0, max: 1, placeholder: "0" },
      { label: "Smoking Status", name: "smoking", hint: "0 none, 1 former, 2 active", min: 0, max: 2, placeholder: "1" }
    ]
  },
  hypertension: {
    title: "Hypertension Risk Assessment",
    endpoint: "/hypertension",
    samples: {
      healthy: {
        age: 30,
        sys_bp: 112,
        dia_bp: 72,
        bmi: 22.9,
        sodium: 138,
        stress: 2
      },
      highRisk: {
        age: 63,
        sys_bp: 176,
        dia_bp: 112,
        bmi: 36,
        sodium: 157,
        stress: 9
      }
    },
    fields: [
      { label: "Age", name: "age", hint: "Adult age: 18-90", min: 18, max: 90, placeholder: "50" },
      { label: "Systolic BP", name: "sys_bp", hint: "Typical: 90-210", min: 90, max: 210, placeholder: "145", unit: "mm Hg" },
      { label: "Diastolic BP", name: "dia_bp", hint: "Typical: 60-130", min: 60, max: 130, placeholder: "95", unit: "mm Hg" },
      { label: "BMI", name: "bmi", hint: "Normal: 18.5-24.9", min: 15, max: 50, placeholder: "31" },
      { label: "Sodium", name: "sodium", hint: "Typical: 120-160", min: 120, max: 160, placeholder: "145", unit: "mmol/L" },
      { label: "Stress Score", name: "stress", hint: "Scale 0-10", min: 0, max: 10, placeholder: "7" }
    ]
  },
  thyroid: {
    title: "Thyroid Risk Assessment",
    endpoint: "/thyroid",
    samples: {
      healthy: {
        age: 28,
        tsh: 2.2,
        t3: 1.7,
        t4: 8.3,
        weight_change: 0,
        fatigue: 2
      },
      highRisk: {
        age: 48,
        tsh: 9.8,
        t3: 0.8,
        t4: 4.2,
        weight_change: 6,
        fatigue: 8
      }
    },
    fields: [
      { label: "Age", name: "age", hint: "Adult age: 18-90", min: 18, max: 90, placeholder: "35" },
      { label: "TSH", name: "tsh", hint: "Typical: 0.2-15", min: 0.2, max: 15, placeholder: "6.2", unit: "uIU/mL" },
      { label: "T3", name: "t3", hint: "Typical: 0.5-4.5", min: 0.5, max: 4.5, placeholder: "1.2", unit: "ng/mL" },
      { label: "T4", name: "t4", hint: "Typical: 3-17", min: 3, max: 17, placeholder: "7.8", unit: "ug/dL" },
      { label: "Weight Change", name: "weight_change", hint: "Kg in recent period", min: -10, max: 10, placeholder: "3", unit: "kg" },
      { label: "Fatigue Score", name: "fatigue", hint: "Scale 0-10", min: 0, max: 10, placeholder: "8" }
    ]
  },
  pcos: {
    title: "PCOS Risk Assessment",
    endpoint: "/pcos",
    samples: {
      healthy: {
        age: 24,
        bmi: 22,
        cycle_irregular: 0,
        insulin: 8,
        testosterone: 28,
        acne: 0
      },
      highRisk: {
        age: 31,
        bmi: 34,
        cycle_irregular: 1,
        insulin: 28,
        testosterone: 102,
        acne: 3
      }
    },
    fields: [
      { label: "Age", name: "age", hint: "Typical: 15-45", min: 15, max: 45, placeholder: "27" },
      { label: "BMI", name: "bmi", hint: "Normal: 18.5-24.9", min: 15, max: 50, placeholder: "30" },
      { label: "Cycle Irregular", name: "cycle_irregular", hint: "0 = No, 1 = Yes", min: 0, max: 1, placeholder: "1" },
      { label: "Insulin", name: "insulin", hint: "Typical: 2-35", min: 2, max: 35, placeholder: "19", unit: "uU/mL" },
      { label: "Testosterone", name: "testosterone", hint: "Typical: 5-120", min: 5, max: 120, placeholder: "70", unit: "ng/dL" },
      { label: "Acne Score", name: "acne", hint: "Scale 0-3", min: 0, max: 3, placeholder: "2" }
    ]
  }
};

export const diseaseList = Object.keys(diseaseForms);
