import unittest
from unittest.mock import patch
import os
import sys
import json

sys.path.insert(0, '../src')

from module import *


class TestFunc(unittest.TestCase):

    def test_1_create_cache(self):
        if not os.path.exists('./.cache'):
            os.mkdir('./.cache')
            with open("./.cache/cache.json", "w") as f:
                f.write('{"assets": []}')
        self.assertTrue(os.path.exists('./.cache'))

    def test_2_add_to_cache(self):
        with open('./.cache/cache.json', 'w') as f:
            f.write('{"assets": ["a"]}')
        with open('./.cache/cache.json', 'r') as f:
            file_before_changes = f.read()
        file_after_changes = add_to_cache('assets', file_before_changes)
        file_before_changes = json.loads(file_before_changes)
        file_before_changes['assets'].append('assets')
        self.assertEqual(file_after_changes, file_before_changes)


    def test_3_read_only(self):
        with open('./.cache/cache.json', 'w') as f:
            f.write('{"assets": ["a"]}')
        res = read_only()
        self.assertEqual(res, {"assets": ["a"]})

    @patch('module.add_to_cache')
    @patch('module.connect_to_server')
    def test_4_write_to_cache(self, connect_to_server, add_to_cache):

        add_to_cache.return_value = '{"assets": ["asset"]}'
        connect_to_server.return_value = True

        write_to_cache('asset', '{"assets": []}')
        res = read_only()
        self.assertEqual(res, {"assets": ["asset"]})

    def test_5_delete_cache(self):
        if os.path.exists('./.cache'):
            os.remove('./.cache/cache.json')
            os.rmdir('./.cache')
        self.assertFalse(os.path.exists('./.cache'))

if __name__ == '__main__':
    unittest.main()
