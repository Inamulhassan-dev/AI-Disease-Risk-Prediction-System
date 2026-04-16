FROM python:3.10-slim

WORKDIR /project

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY app ./app
COPY model ./model

EXPOSE 5001

CMD ["python", "app/app.py"]
