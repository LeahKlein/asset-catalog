# Asset Catalog

The client runs as a command line interface (CLI) tool on a remote computer.
A file cannot be uploaded twice (even when multiple clients are running).
The client will receive as input a command to upload a file to the server. If the file does not already exist on the server, it will send the file to the server.

## Run the tool

### Run the server

```bash
docker build -t <image name> .
docker run -p 5000:5000 -it <image name>
```

### Run the client

```bash
docker build -t <image name> .
docker run -it <image name>
```

### Use CLI tool

Enter the client container.

```bash
docker exec -it <container id> /bin/sh
```

Enter a command to upload a file.

```bash
python asset_catalog.py upload <path/to/file>
```

Good luck and have fun!
