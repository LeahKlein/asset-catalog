import sys
import os
import unittest
from unittest.mock import patch
sys.path.insert(0, os.path.abspath('../src'))
from asset_catalog import main

class TestAssetCatalog(unittest.TestCase):
    
    @patch('sys.argv', new=['asset_catalog.py', 'upload', 'test.txt'])
    def test_upload_file_called(self):
        with patch('asset_catalog.upload_file') as mock_upload:
            main()
            mock_upload.assert_called_once_with('test.txt')

    @patch('sys.argv', new=['asset_catalog.py', 'view'])
    def test_list_files_called(self):
        with patch('asset_catalog.list_files') as mock_list:
            main()
            mock_list.assert_called_once()

    @patch('sys.argv', new=['asset_catalog.py'])
    def test_no_arguments(self):
        with self.assertRaises(TypeError) as context:
            main()
        self.assertEqual(str(context.exception), "Usage: python src/asset-catalog.py 'upload/u/-u <data_path>' or 'view/view/v/-v' ")

    @patch('sys.argv', new=['asset_catalog.py', 'invalid_command'])
    def test_invalid_command(self):
        with self.assertRaises(TypeError) as context:
            main()
        self.assertEqual(str(context.exception), "Invalid command.")

if __name__ == '__main__':
    unittest.main()