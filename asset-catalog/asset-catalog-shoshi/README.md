# Asset Catalog

The assignment is to upload assets from any number of remote clients to a centralized server for persistent storage.
The commands are executed through the CLI.

## To build and run command

run the command:

- `docker build -t [imageName] .`
- `docker run --entrypoint=bash -it [imageName]`

Now the client can to enter two command

- To upload file to remote server.
- Read the contents from the cache.

To insert a command you have to write:

`node src/main.js [command]`

To upload file the command is: `uploadFile [nameOfFile]`.

To read from cache the command is: `read`.
