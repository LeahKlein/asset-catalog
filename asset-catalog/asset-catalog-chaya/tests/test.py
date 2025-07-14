import sys
import os
import unittest
sys.path.insert(0, os.path.abspath('../src'))
from main import exist, upload


class Test(unittest.TestCase):
    def test_dummy(self):
        pass

    def test_exist_file(self):
        self.assertTrue(exist("sing2.mp3"))

    def test_not_exist_file(self):
        self.assertFalse(exist("s.mp3"))

    def test_upload_correct_path(self):
        self.assertEqual(upload("t.jpg", "C:/Users/cFefer/Desktop/Asset_Catalog/asset-catalog/asset-catalog-chaya/src/up.txt"), 'The file is already uploaded')
if __name__ == '__main__':
    unittest.main()
