from flask import Flask, request

app = Flask(__name__)


@app.route('/upload', methods=['POST'])
def upload():
    file_name = request.files['file']
    return f'Uploaded file: {file_name}', 200


if __name__ == '__main__':
    app.run(host="0.0.0.0", port='8000')
