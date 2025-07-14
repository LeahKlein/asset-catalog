import sys
import os
import unittest
from unittest.mock import patch, mock_open

sys.path.insert(0, os.path.abspath('../src'))
import functions as func

CACHE_FILE = '../.cache/cache.json'

class TestFunctions(unittest.TestCase):

    def test_check_is_exist_file_in_cache(self):
        mock_cache_data = '{"files": [{"name": "test.txt", "path": "/path/to/test.txt"}]}'
        with patch("builtins.open", mock_open(read_data=mock_cache_data)):
            self.assertTrue(func.check_is_exist_file_in_cache("test.txt"))
            self.assertFalse(func.check_is_exist_file_in_cache("nonexistent.txt"))

    def test_upload_file_to_cache(self):
        mock_data = '{"files": []}'
        with patch("builtins.open", mock_open(read_data=mock_data)) :
            func.upload_file_to_cache("test.txt", "/path/to/test.txt")
        
    @patch('functions.requests.post')
    @patch('builtins.open', new_callable=mock_open, read_data=" data")
    def test_upload_file_to_remote_server(self, mock_open_file, mock_post):
        mock_post.return_value.status_code = 200
        self.assertTrue(func.upload_file_to_remote_server("test.txt"))
        mock_post.return_value.status_code = 400
        self.assertFalse(func.upload_file_to_remote_server("test.txt"))


if __name__ == '__main__':
    unittest.main()