# ***asset catalog***

The task of asset catalog will simulate asset storage in a distributed system. The assets can be of any type. The purpose of the task is to upload assets from any number of remote clients to the remote server. The server is responsible for storing the actual data representing the property.
An asset cannot be uploaded to the server twice.

The client will run as a CLI tool on a server and he have two commands that he can run:

- print all assets that uploaded to server.

```js
npm asset_catalog assets_list
```

- upload the file to the server
  
```js
npm asset_catalog path
```
