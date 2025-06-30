import requests

cache_file_path = "/app/.cache/cache.json"

def file_exist(file_name):
        with open(cache_file_path, "r", encoding='utf-8') as f:
            return file_name in f.read().splitlines()  

def upload_file(file_path, file_name):
    try:
        with open(file_path, 'rb') as file:
            files = {'file': (file_name, file)}
            response = requests.post('http://host.docker.internal:5000/upload', files=files)
        response.raise_for_status() 
        update_cache(file_name)
    except requests.exceptions.RequestException as e:
        raise Exception(f"An error occurred: {e}")

       
def update_cache(file_name):
    try:
        with open(cache_file_path, "a", encoding='utf-8') as f:
           f.write(file_name + "\n")  
    except requests.exceptions.RequestException as e:
        raise Exception({e})


      

