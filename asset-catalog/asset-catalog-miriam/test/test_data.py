import unittest
import os
import json
import sys
from unittest.mock import patch
sys.path.insert(0, '../src')
from src import data

class TestData(unittest.TestCase):
    
    global filePath
    filePath = __file__.split('test_data')[0]+'.cache/watch-directory.json'

    def create_watch_directory(self):
        try:
            os.chdir('test')
            os.mkdir('.cache')
            os.chdir('.cache')
            open('watch-directory.json','w')
        except:
            pass

    def delete_the_watch_directory(self):
        try:
            if os.path.exists('../.cache'):
                os.chdir('.cache')
                os.remove('watch-directory.json')
        except: pass

    def insert_data_to_watch_directory(self):
        with open(filePath, "w") as file:
            file.seek(0)
            data = {"asset1":"try.py"}
            json.dump(data, file, indent=4)

    def setUp(self):
        TestData.create_watch_directory(self)
        TestData.insert_data_to_watch_directory(self)

    def test_slice_asset_name(self):
        test_data = data.Data("C:/Users/assets/hello.txt", filePath)
        self.assertEqual(test_data.__slice_asset_name__(),'hello.txt')

    def test_return_error_when_not_a_valid_path(self):
        test_data = data.Data("helloEveryone!", filePath)
        self.assertEqual(test_data.__slice_asset_name__(), "Not a valid path.......")

    def test_load_file(self):
        test_data = data.Data("C:/Users/assets/hello", filePath)
        test_data.__load_file__()
        self.assertEqual(test_data.file_data, {'asset1':'try.py'})

    def test_check_if_file_exist(self):
        test_data = data.Data("C:/Users/try.py", filePath)
        self.assertEqual(test_data.check_if_asset_is_not_exist(), "This asset is already exist")
        TestData.delete_the_watch_directory(self)
    
    def test_return_true_if_file_not_exit(self):
        test_data = data.Data("C:/Users/try2.py", filePath)
        self.assertTrue(test_data.check_if_asset_is_not_exist())

    @patch('src.data.requests.post')
    def test_save_in_server(self, save_in_server):
        save_in_server.return_value = 200
        test_data = data.Data("C:/users/try.py", filePath)
        res = test_data.save_in_server()
        self.assertEqual(res, 200)

    def test_log_assets(self):
        self.create_watch_directory()
        self.insert_data_to_watch_directory()
        test_data = data.Data("C:/Users/try.py", filePath)
        assets = test_data.log_assets()
        self.assertEqual(assets, "['try.py']")

if __name__ == "__main__":
    unittest.main()
