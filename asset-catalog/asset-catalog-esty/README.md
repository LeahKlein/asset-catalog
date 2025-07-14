# Asset Catalog

---

## What the project does

1. The client runs as a CLI tool on a remote machine.
2. The client watches a directory for file changes and upload the changed  
files to the remote server.
3. The client can't change or move the files from the watched directory.
4. No file can be uploaded twice (even when multiple clients are running).
5. The client can recover state from a previous execution.

---

## How to run in docker

Run the following commands in the terminal:

- `docker build -t cli .`
- `docker run -it cli`

Now you can run the following commands:

1. List the changed files: `python src/cli.py ls`
2. Upload a file: `python src/cli.py upload ["FILE NAME"]`

To exit click `ctrl+D`
