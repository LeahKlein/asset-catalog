import json
import sys
import os
import threading
import requests


def argument_exist_in_cache(assets):
    data = read_only()
    if assets[0] not in data["assets"]:
        write_to_cache(assets[0], data)


def add_to_cache(assets, data):
    if type(data) != dict:
        data = json.loads(data)
    data['assets'].append(assets)
    return data


def write_to_cache(assets, data):
    data = add_to_cache(assets, data)
    with open('./.cache/cache.json', 'w') as f:
        f.write(str(data).replace("'", '"'))
    connect_to_server(assets)


def connect_to_server(assets):
    response = requests.post('https://localhost:3000', data=assets)
    return response.text


def read_only():
    try:
        with open('./.cache/cache.json') as f:
            data = f.read()
            data =json.loads(data)
            return data
    except Exception as e:
        raise e


def main(asset):
    assets = []
    assets.append(asset)
    lock = threading.Lock()
    lock.acquire()
    argument_exist_in_cache(assets)
    lock.release()


def show():
    try:
        data = read_only()
    except Exception as e:
        raise e
    print('assets:\n {}'.format(data['assets']))


if __name__ == '__main__':
    assets = sys.argv[1:]
    show() if ( assets[0] == 'show') else main(assets)

