import os

from dotenv import load_dotenv
from flask import Flask, request


app = Flask(__name__)
load_dotenv()


@app.route('/upload', methods=['POST'])
def upload():
    file = request.files['file']
    file_path = os.path.join('files', file.filename)
    file.save(file_path)
    return 'Uploaded {file.filename} successfully!', 200


@app.route('/')
def index():
    return 'Hello World!'


if __name__ == '__main__':
    app.run(host=os.getenv('HOST'), port=int(os.getenv('PORT')))
