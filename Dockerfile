FROM python:3.10-slim

WORKDIR /app

COPY app /app/app
COPY model /app/model

RUN pip install --no-cache-dir flask flask-cors joblib numpy scikit-learn pyjwt shap lime

EXPOSE 5000

CMD ["python", "app/app.py"]
