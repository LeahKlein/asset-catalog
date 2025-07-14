# Asset Catalog

This assignment will simulate the various tasks around storing assets in a distributed system. For all intents and purposes, the assets mentioned above could be of any type: audio, images, videos, text-data, binary-data, etc. The goal of the assignment is to upload assets from any number of remote clients to a centralized server for persistent storage. The server is responsible for the storage of the actual data that represents the asset, as well as the metadata that describes the data.

## Use

After running the dockerfile and creating a container, enter the terminal and navigate to the main.py file.
Now you can run the following commands:

```docker
python main.py exist `filename`
```

Instead of `filename` -  write the name of the file you want to check.
This command checks if a file with this name already exists on the server. If so, you will not be able to upload the file to the server.

```docker
python main.py upload `filename` `filepath`
```

Instead of `filename` and `filepath` -  write the name of the file you want to upload and its path.
The command uploads the file from the routing you specified to the server, only if a file with this name does not already exist on the server.

```docker
python main.py ls
```

This command prints you the names of all the files that exist on the server.
