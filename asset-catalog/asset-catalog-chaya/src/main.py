import json
import logging
import os
import threading
import typer
from dotenv import load_dotenv

logger = logging.getLogger()

load_dotenv()
lock = threading.Lock()
app = typer.Typer()

dir_path = os.path.dirname(__file__)
cache_path = os.path.join(dir_path, 'cache.txt')
SERVER = os.getenv('SERVER')

@app.command()
def exist(filename):
    try:
        with open(cache_path, encoding="utf-8") as cache:
            contents = cache.read()
            if filename in contents:
                return True
            return False
    except Exception as error:
        logger.error(error)


def upload_to_server(filepath):
    with open(SERVER, "a", encoding = "utf-8") as output: # type: ignore
        for line in input.readlines():
            output.write(line)
        metadata = str(os.stat(filepath))
        output.write('\n')
        output.write(metadata)
        output.write('\n')
                    
def upload_to_cache(filename):
    with open(cache_path, "a", encoding = "utf-8") as output:
        filename = json.dumps(filename)
        output.write(filename)
        output.write('\n')


@app.command()
def upload(filename, filepath):
    try:
        lock.acquire()
        if exist(filename):
            logger.info("exist file")
            return "The file is already uploaded"
        else:
            with open(filepath, "r", encoding = "utf-8"):
                upload_to_server(filepath)
                upload_to_server(filename)
            lock.release()
            logger.info("The file has been uploaded successfully!")
    except Exception as error:
        logger.error(error)

@app.command()
def ls():
    try:
        with open(cache_path, "r", encoding = "utf-8") as cache:
            for line in cache.readlines():
                logger.info(line)
    except Exception as error:
        logger.error(error)

if __name__ == "__main__":
    app()
