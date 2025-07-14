import unittest
import json
import os
from src import functions


class TestIsFileExist(unittest.TestCase):

    def test_file_exist(self):
        """
        Test is_file_exist function to return True when file exists
        """
        self.assertFalse(functions.is_file_exist(1))

    def test_file_not_exist(self):
        """
        Test is_file_exist function to return False when file does not exist
        """
        self.assertFalse(functions.is_file_exist('a'))


class TestLs(unittest.TestCase):

    def test_ls(self):
        """
        Test ls function to return the list of the files that in cache file
        """
        files = {"files": ['a', 'b', 'c']}
        json_object = json.dumps(files)

        test_dir = os.path.join(os.getcwd(), 'try')
        os.mkdir(test_dir)
        os.chdir(test_dir)

        with open('cache.json', 'w')as cache_file:
            cache_file.write(json_object)

        self.assertEqual(functions.ls(test_dir), files["files"])

    def test_ls_path_does_not_exist(self):
        """
        Test ls function to throw error message when the current path does not exist
        """
        with self.assertRaises(NotADirectoryError):
            functions.ls(1)


class TestSaveInServer(unittest.TestCase):

    def save_in_server(self):
        """
        Test save_in_server function to save file in the server
        and return status code 200
        """
        self.assertEqual(functions.save_in_server('abc'), 200)


class TestSaveInCache(unittest.TestCase):

    def save_in_cache(self):
        """
        Test save_in_cache function to save file in cache
        """
        functions.save_in_cache('try')
        self.assertTrue(functions.is_file_exist('try'))
