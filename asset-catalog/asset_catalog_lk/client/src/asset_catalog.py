import argparse
from src import function
import os


def upload(file_path):
    file_name = os.path.basename(file_path)
    if not os.path.exists(file_path):
        return 'Invalid input - file does not exist.'
    if function.is_file_exist(file_name):
        return 'The file already exists.'
    function.upload_file(file_path, file_name)
    return f'Uploaded {file_name} successfully!'


def main():
    parser = argparse.ArgumentParser(
        description='Upload files using the CLI tool.')
    parser.add_argument('command', choices=['upload'], help='Command to run')
    parser.add_argument('file_path', help='Path to the file to upload')
    args = parser.parse_args()
    if args.command == 'upload':
        if args.file_path:
            upload(args.file_path)
    else:
        raise ValueError('Invalid Input')


if __name__ == '__main__':
    main()
