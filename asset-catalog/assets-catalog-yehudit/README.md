
# Asset Catalog

This project simulates the various tasks around storing assets in a distributed system. The assets can be upload from any number of remote clients to a centralized server for persistent storage. The server is responsible for the storage of the actual data that represents the asset, as well as the metadata that describes the data.
No asset can be uploaded twice.
The assets mentioned above could be of any type: audio, images, videos, text-data, binary-data, etc.

This code write in 'JavaScript'.

The client send the asset from CLI tool.

## Usage

There are two options for client:

1. to read all assets that in server:
    - `npm asset-catalog watch`
    - `npm asset-catalog -w`
2. to upload asset to server:
    - `npm asset-catalog <path-of-asset>` replace the `<path-of-asset>` to path of asset (the client can upload several paths at once).
