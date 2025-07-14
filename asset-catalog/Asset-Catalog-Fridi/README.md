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

## How to run the tool?

- Run the server:

```bash
docker build -t '<server>'
```

```bash
docker run -p 8080:8080 '<server>'
```

- Run the client:

```bash
docker build -t '<clientCLI>'
```

```bash
docker run -p 8080:8080 '<clientCLI>'
```

- Use the CLI tool:

 To view all the upload fils or recover state:

```docker
python asset_catalog.py  '<view/view/v/-v>'
```

To add asset_catalog:

```docker
python asset_catalog.py '<upload/u/-u>' '<data_path>'
```
