import json
import os
import requests

from dotenv import load_dotenv

load_dotenv()

CACHE_FILE = os.getenv('CACHE_FILE')
SERVER_URL = os.getenv('SERVER_URL')
    
def check_is_exist_file_in_cache(file_name):
    cache = load_cache()
    for file in cache['files']:
        if file['name'] == file_name:
            return True
    return False

def upload_file_to_remote_server(file_path):
    try:
        with open(file_path, "rb") as f:
            response = requests.post(SERVER_URL, files={"file": f})
        return response.status_code == 200
    except Exception as e:
        raise ValueError(f"Error uploading file '{file_path}': {e}")

def upload_file_to_cache(file_name,file_path):
    cache = load_cache()
    cache["files"].append({"name": file_name, "path": file_path})
    save_cache(cache)

def load_cache():
    with open(CACHE_FILE, "r") as f:
        return json.load(f)

def save_cache(cache):
    with open(CACHE_FILE, "w") as f:
        json.dump(cache, f)

