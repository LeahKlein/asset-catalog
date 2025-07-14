from flask import Flask, request

app = Flask(__name__)
@app.route('/', method = ['POST'])

def upload():
    asset_name = request.files['asset']
    return f'Asset {asset_name} upload successfully', 200

if __name__ == '__main__':
    app.run(debug = True, host = '0.0.0.0')
