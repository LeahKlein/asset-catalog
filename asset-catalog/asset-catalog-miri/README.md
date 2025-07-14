# ASSET CATALOG

This catalog allowing storing assets in a distributed system. For all intents and purposes, the assets mentioned above could be of any type: audio, images, videos, text-data, binary-data, etc. this catalog allowing is to upload assets from any number of remote clients to a centralized server for persistent storage. The server is responsible for the storage of the actual data that represents the asset, as well as the metadata that describes the data.

## The clients

The access of the client to the catalog is by the cli

The possible commands:

- For watch the cache.

 ```cmd
 npm run asset-catalog [-w/w/watch] 
 ```

- To add new asset

 ```cmd
 npm run asset-catalog [-u/u/update] {path of the asset} 
 ```

This action adds it to the cache and to the server.

Pay attention to insert correct path of asset

### Activation

In order to activate the program you have to run the dockerfile of the server to activate the server,
and to run the dockerfile of the client, and in his terminal to write the commands.
