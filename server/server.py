from flask import Flask, request
import os

app = Flask('helloworld')

@app.route('/upload', methods=['POST'])
def upload():
    # if 'file' not in request.files:
    #     return "No file part", 400
    file = request.files['file']
    # if file.filename == '':
    #     return "No selected file", 400
    file_path = os.path.join("files", file.filename)
    file.save(file_path)  
    return "Uploaded {file.filename} successfully!",200

@app.route('/')
def index():
    return "Hello World!"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)