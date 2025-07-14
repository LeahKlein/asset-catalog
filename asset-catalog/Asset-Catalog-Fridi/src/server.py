import os

from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/upload', methods=['POST'])
def upload_file():
    
    if 'file'  in request.files:
        file = request.files['file']
        
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    os.makedirs("./uploaded_files_server", exist_ok=True)
    file.save(f"./uploaded_files_server/{file.filename}")
    return jsonify({"message": "uploaded!!"}), 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)