# **ASSET CATALOG**

In this assignment, I built a catalog that allows for the storage of assets in a distributed system. The assets can be of any type: audio, images, videos, text-data, binary data, etc. This catalog allows assets to be uploaded from any number of remote clients to a central server for persistent storage. The server is responsible for storing the actual data that represents the asset, as well as the metadata that describes the data.
***
The server side of calculator is written in *JavaScript* with OOP.
***

## **Run**

**Building a client in docker:**

*docker run --name `<choose name>` -p `<your port>` -v `<your path>`:/`<choose name>`*
***

## **Server**

```cmd
 npm start
 ```

***

## **Client**

The client communicates with the catalog through the terminal that simulates the cli.

Possible commands:

- Read from the cache-

 ```cmd
 npm start asset-catalog read 
 ```

- Upload new asset-

 ```cmd
 npm start asset-catalog update {path of the asset} 
 ```

-*Pay attention to insert correct path of asset*
