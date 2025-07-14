
# _Asset-catalog_ #

This assignment will simulate the various tasks around storing
assets in a distributed system.
For all intents and purposes,the assets mentioned above could be of any type:
 audio, images, videos, text-data, binary-data, etc.
The goal of the assignment is to upload assets from any number of remote clients
to a centralized server for persistent storage.
The server is responsible for the storage of the actual data
that represents the asset,
well as the metadata that describes the data.

## Getting start ##

- Enter to server directory ,and run next command:
  - ` docker build -t <server> . `
  - ` docker run -p 3000:3000 <server> `
- Go out to general directory and run next command:
  - ` docker build -t <cli> . `
  - ` docker run -it --entrypoint /bin/bash <cli> `
  and bash teminal open to you, now you can type:
    - ` npm run files `- in order to get the files that exist in cache
    - and ` npm run newFile <fileName> ` to save new file with name _fileName_
  