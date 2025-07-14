import sys
import unittest
from unittest.mock import patch
from src import asset_catalog


class TestAssetCatalogFunction(unittest.TestCase):

    @patch('src.function.upload_file')
    @patch('src.function.is_file_exist')
    @patch('os.path.exists')
    def test_upload(self, mock_exists, mock_file_exist, mock_upload_file):

        mock_exists.return_value = True
        mock_file_exist.return_value = False
        mock_upload_file.return_value = None
        result = asset_catalog.upload('path/to/file.txt')
        expected_result = 'Uploaded file.txt successfully!'
        self.assertEqual(result, expected_result)

    @patch('src.function.is_file_exist')
    @patch('os.path.exists')
    def test_file_exist(self, mock_exists, mock_file_exist):

        mock_exists.return_value = True
        mock_file_exist.return_value = True
        result = asset_catalog.upload('path/to/file.txt')
        expected_result = 'The file already exists.'
        self.assertEqual(result, expected_result)

    @patch('os.path.exists')
    def test_Incorrect_address(self, mock_exists):

        mock_exists.return_value = False
        result = asset_catalog.upload('path/to/file.txt')
        expected_result = 'Invalid input - file does not exist.'
        self.assertEqual(result, expected_result)

    @patch('src.asset_catalog.upload')
    def test_main(self, mock_upload):
        sys.argv = ['asset_catalog.py', 'upload', 'path/to/file.txt']
        asset_catalog.main()
        mock_upload.assert_called_once_with('path/to/file.txt')


if __name__ == '__main__':
    unittest.main()
