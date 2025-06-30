import function
import os
import sys

def upload(file_path):
    file_name = os.path.basename(file_path)
    if os.path.exists(file_path):
        if not function.file_exist(file_name):
            function.upload_file(file_path, file_name)
            return (f"Uploaded {file_name} successfully!")
        else:
            return "The file already exists."
    else:
        return "Invalid input - file does not exist."

def main():
    while True:
        user_input = input("Enter command (upload <file_path>): ")
        args = user_input.split()
        if len(args) > 0:
            command = args[0]
            match command:
                case 'upload':
                    if len(args) == 2:
                        upload(args[1])
                    else:
                        return("Invalid Input - Add path to file")
                case _:
                    return("Invalid Input")

if __name__ == "__main__":
    main()


