import json
import re
import requests
from dotenv import load_dotenv
import os

load_dotenv()


class Data:

    def __init__(self, asset_path = "", watch_directory_path = '../.cache/watch-directory.json'):
        try:
            self.watch_directory_path = watch_directory_path
            self.asset_path = asset_path
            self.asset_name = self.__slice_asset_name__() if self.asset_path != "" else ""
            self.file_data = self.__load_file__()
            self.len = len(self.file_data)
        except:
            pass

    def __slice_asset_name__(self):
        really_path = self.asset_path.replace('\\', '/')
        if really_path.find('/') == -1:
            return("Not a valid path.......")
        split_path = re.split('/',really_path)
        return (split_path[len(split_path)-1])

    def __load_file__(self):
        with open(self.watch_directory_path, 'r+') as file:
            try:
                data = json.load(file)
            except:
                json.dump({}, file)
        return data if 'data' in locals() else {}
    
    def check_if_asset_is_not_exist(self):
        if self.asset_name in self.file_data.values():
            return("This asset is already exist")
        return True

    def write_data(self):
        data = {'asset' + str(self.len + 1) : self.asset_name}
        with open(self.watch_directory_path,'w') as file:
            self.file_data.update(data)
            file.seek(0)
            json.dump(self.file_data, file, indent=4)

    def save_in_server(self):
        url = os.getenv('HOST'),':',os.getenv('PORT')
        asset = {"asset":self.asset_name}
        response = requests.post(url, files=asset)
        return response
        
    def log_assets(self):
        return(str(self.file_data.values()).split('(')[1].split(')')[0])
