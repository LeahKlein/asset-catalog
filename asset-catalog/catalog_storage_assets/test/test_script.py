import sys
sys.path.append('catalog_storage_assets/src/main')   
from catalog_storage_assets.src.main import Add_file
import unittest

class TestAdd(unittest.TestCase): 

    def test_is_exist_ok(self):
        objectAdd = Add_file("file1.txt")
        self.assertEqual(objectAdd.isExist(), "This file already exists system")

    def test_is_exist_not_correct(self):
        objectAdd = Add_file("Mytxt.txt")
        self.assertEqual(objectAdd.isExist(),"To Upload")

    def test_add_to_cache(self):
        objectAdd = Add_file("Mytxt1.txt")
        self.assertEqual(objectAdd.add_to_treasure(), "Successfully appended to the JSON file")
     
    def test_add_file_to_server(self):
        objectAdd = Add_file("Mytxt1.txt")
        self.assertEqual(str(objectAdd.add_to_server()),"The file is not correct")