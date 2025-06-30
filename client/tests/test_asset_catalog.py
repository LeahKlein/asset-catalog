import os
import sys

import unittest
from unittest.mock import patch, mock_open

sys.path.append(os.path.join(os.path.dirname(__file__), '../src'))
import asset_catalog
import function

class TestAssetCatalogFunction(unittest.TestCase):
    
    @patch('function.upload_file')
    @patch('function.file_exist')
    @patch('os.path.exists')
    def test_upload(self, mock_exists, mock_file_exist, mock_upload_file):
        
        mock_exists.return_value = True
        mock_file_exist.return_value = False
        mock_upload_file.return_value = None
        result = asset_catalog.upload('path/to/file.txt')
        expected_result = "Uploaded file.txt successfully!"
        self.assertEqual(result, expected_result)

        mock_exists.return_value = True
        mock_file_exist.return_value = True
        result = asset_catalog.upload('path/to/file.txt')
        expected_result = "The file already exists."
        self.assertEqual(result, expected_result)

        mock_exists.return_value = False
        result = asset_catalog.upload('path/to/file.txt')
        expected_result = "Invalid input - file does not exist."
        self.assertEqual(result, expected_result)

    @patch('builtins.input', side_effect=['upload path/to/file.txt', 'exit'])
    @patch('asset_catalog.upload')
    def test_main(self, mock_upload, mock_input):
        asset_catalog.main()
        mock_upload.assert_called_once_with('path/to/file.txt')

if __name__ == '__main__':
    unittest.main()
