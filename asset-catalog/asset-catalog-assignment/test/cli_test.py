import sys
import os
sys.path.insert(0,os.path.abspath('./src'))
from main import upload_a_file 
import main
    
def test_upload_a_file():
        app1.input = lambda x:'free.jpg'
        assert upload_a_file()== 'The file already exists'
        app1.input=input
