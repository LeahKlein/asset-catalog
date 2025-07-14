FROM python:latest
WORKDIR /catalog
COPY requirements.txt .
RUN python -m pip install -r requirements.txt
COPY . . 
CMD [ "bash"]
