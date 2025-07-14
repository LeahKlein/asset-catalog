import json
import threading
import sys
sys.path.append('catalog_storage_assets/src/watch')   
import os

lock = threading.Lock()
dir_path = os.path.dirname(os.path.realpath(__file__))
json_file = os.path.join(dir_path, 'watch.json')
class Add_file:
  
  def __init__(self,file_name):
    self.file_name=file_name
    
  def isExist(self): 
      try:   
        if os.path.exists(json_file):
                with open(json_file, 'r') as f:
                    data = json.load(f)
                    for file in data['files']:
                        if file['name'] == self.file_name:
                            return "This file already exists system"
                return "To Upload"
        else:
                raise Exception("not fount in this dir")
      except Exception as error:
              raise error           
        
  def add_to_treasure(self):
    lock.acquire()
    try:
      if os.path.exists(json_file):
       with open(json_file, 'r') as f:
          data = json.load(f)
      else:
         data = {"files": []}
       
      new_file = {"name": self.file_name}
      data["files"].append(new_file)

      with open(json_file, 'w') as f:
          json.dump(data, f, indent=4)     
    except:
      raise Exception("Failed write file to cache")   
    finally:
        lock.release()
        return 'Successfully appended to the JSON file'
         
  def add_to_server(self):  
      try:   
        os.makedirs(dir_path, exist_ok=True)  
        with open('../../myFile.txt', 'r', encoding='utf-8') as rf:
          with open(os.getenv('destination_folder'), 'w', encoding='utf-8') as wf:
              for line in rf:
                  wf.write(line) 
        return "The file has been successfully added to the server"
      except:
        return Exception("The file is not correct")   