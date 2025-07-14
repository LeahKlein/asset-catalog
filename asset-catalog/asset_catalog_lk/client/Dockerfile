FROM python:3.13

# WORKDIR /app

# COPY . /app
COPY . .

RUN pip install -r requirements.txt

ENV PYTHONPATH="/app:${PYTHONPATH}"

CMD ["python", "./src/asset_catalog.py"]

