import json
import threading
import os
import requests

from dotenv import load_dotenv

lock = threading.Lock()
load_dotenv()

SERVER_URL = os.getenv('SERVER_URL')
cache_path = os.path.join(os.getcwd(), '.cache')


def ls(cache_path=cache_path):
    try:
        os.chdir(cache_path)

        with open('cache.json', 'r') as cache_file:
            cache_data = json.load(cache_file)

        return cache_data["files"]
    except Exception as error:
        raise error


def is_file_exist(file_name):
    try:
        for file in ls():
            if file == file_name:
                return True

        return False

    except Exception as error:
        raise ValueError(error)


def upload(file_name):
    try:
        lock.acquire()

        if is_file_exist(file_name):
            return False

        if save_in_server(file_name):
            save_in_cache(file_name)

        lock.release()
        return True
    except Exception as error:
        lock.release()
        raise ValueError(error)
    


def save_in_server(file_name):
    try:
        file = {'file': file_name}
        response = requests.post(SERVER_URL, files=file)
        return response.status_code
    except Exception as error:
        raise ValueError(error)


def save_in_cache(file_name, cache_path=cache_path):
    try:
        os.chdir(cache_path)

        with open('cache.json', 'r') as cache_file:
            cache_data = json.load(cache_file)

        cache_data["files"].append(file_name)
        cache_json = json.dumps(cache_data)

        with open('cache.json', 'w') as cache_file:
            cache_file.write(cache_json)
    except Exception as error:
        raise ValueError(error)
