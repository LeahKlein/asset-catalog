import typer
import os
import json
import threading
from _thread import *
from typing_extensions import Annotated
import os
import sys
from dotenv import load_dotenv

app=typer.Typer()
load_dotenv()
current_dir = os.path.dirname(__file__)
lock = threading.Lock()

@app.command()
def upload_a_file(): 
    route=input("Enter a path to the file you want to upload") 
    try:
        cache = os.path.join(current_dir,os.getenv("CACHE_ROUTE"))
        server=os.path.join(current_dir,os.getenv("SERVER_ROUTE"))
        new_routing=server+"/"+name
        name=os.path.basename(route)
        if(check_cache(name,cache)==False):
            lock.acquire(True)
            save_in_server(new_routing,route)
            save_in_cache(name,cache)
            lock.release()
            return "success"
        else:
            return "The file already exists"
    except Exception as e:
       raise ValueError(f'"failure" - {str(e)}')

def check_cache(name:str,cache:str):
    with open(cache) as json_data:
        data = json.load(json_data)
    for find_name in data:
        if(find_name["name"]==name):
            return True
    return False

def save_in_server(new_routing:str,route:str):
    try:
        with open(route,'rb') as data:
            content = data.read()
        with open(new_routing,'wb') as file:
            file.write(content)
            return("saved on the server")
    except Exception as e:
        raise ValueError(f'"Unable to save on server" - {str(e)}')     
   
def save_in_cache(name:str,cache:str):
    new1={"name":name}
    try:
        with open(cache,'r+') as open_cache:
            local_cache=json.load(open_cache)
            local_cache.append(new1)
            open_cache.seek(0)
            json.dump(local_cache, open_cache, indent = 4)
        return("saved on the cache")
    except Exception as e: 
        raise ValueError(f'Unable to save on cache - {str(e)}')
        
if __name__=="__main__":
    app()
