import unittest
from unittest.mock import patch, mock_open
from src import function


class TestFunction(unittest.TestCase):

    @patch(
            'src.function.open',
            new_callable=mock_open,
            read_data='existing_file.txt\n')
    def test_file_exist(self, mock_open):
        result = function.is_file_exist('existing_file.txt')
        self.assertTrue(result)

        result = function.is_file_exist('non_existing_file.txt')
        self.assertFalse(result)

    @patch('src.function.requests.post')
    @patch('src.function.open', new_callable=mock_open)
    def test_upload_file(self, mock_open, mock_post):
        mock_post.return_value.status_code = 200
        mock_post.return_value.text = 'Uploaded {file.filename} successfully!'
        with patch('builtins.open', mock_open(read_data=b'Some file content')):
            result = function.upload_file('path/to/file.txt', 'file.txt')
            self.assertIsNone(result)
        with patch(
                'builtins.open', mock_open(read_data=b'Some file content')):
            result = function.upload_file('path/to/file.txt', 'file.txt')
            self.assertIsNone(result)

    @patch('src.function.open', new_callable=mock_open)
    def test_update_cache(self, mock_file):
        function.update_cache('new_file.txt')
        mock_file().write.assert_called_once_with('new_file.txt\n')


if __name__ == '__main__':
    unittest.main()
