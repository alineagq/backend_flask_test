FROM python:3.8-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install --trusted-host pypi.python.org -r requirements.txt

COPY . /app

EXPOSE 5000

ENV FLASK_APP backend/app.py

CMD ["flask", "run", "--host=0.0.0.0", "--port=5000"]
