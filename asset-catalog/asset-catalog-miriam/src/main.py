import argparse
from data import Data
import threading
lock = threading.Lock()

def connect_to_cli():
    parser = argparse.ArgumentParser(description="save assets in the catalog")
    parser.add_argument("-s","--save",type=str, nargs=1,
                        metavar='asset_path', default=None,
                        help="save the assets in the watch directory")
    parser.add_argument("-ls", "--lists",nargs='*', default=None,
                        help="return all the assets that are saves")
    return parser.parse_args()

def create_data(args):
    return Data(args.save[0]) if args.save != None else Data()


def check_if_asset_exist(data):
    return data.check_if_asset_is_not_exist()

def save_assets(data):
    data.write_data()
    data.save()

def main():
    args = connect_to_cli()
    data = create_data(args)
    if args.save != None:
        lock.acquire()
        not_exist = check_if_asset_exist(data)
        if not_exist == True:
            save_assets(data)
        lock.release()
    if args.lists != None:
        print(data.log_assets())

if __name__ == '__main__':
    main()
