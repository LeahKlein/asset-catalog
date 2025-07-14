import os
import sys
from pathlib import Path
import threading
import functions as func

lock = threading.Lock()

def upload_file(file_path):
    lock.acquire()
    if not os.path.exists(file_path):
        raise TypeError('The file or directory at {file_path} does not exist.')
    file_name = os.path.basename(file_path)
    if  func.check_is_exist_file_in_cache(file_name):
        raise ValueError(f"File '{file_name}' already exists.")
    if func.upload_file_to_remote_server(file_path):
        func.upload_file_to_cache(file_name,file_path)
    lock.release()

def list_files():
    cache = func.load_cache()
    if not cache["files"]:
        raise ValueError("No files have been uploaded.")
    else:
        print("The uploaded files:")
        for entry in cache["files"]:
            print(f"- {entry}")

def main():
    cli_args = sys.argv
    if len(cli_args) < 2:
        raise TypeError("Usage: python src/asset-catalog.py 'upload/u/-u <data_path>' or 'view/view/v/-v' ")
    command = sys.argv[1]
    data_path = cli_args[2] if len(cli_args) > 2 else ''
    match  command:
        case "u" | "upload" | "-u":
            upload_file(data_path)
        case "v" | "view" | "-v":
            list_files()
        case _:
            raise TypeError("Invalid command.")

if __name__ == "__main__":
    main()