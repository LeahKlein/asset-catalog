# asset-catalog #

## This assignment will simulate the various tasks around storing assets in a distributed system ##

We will have to write cli client code that receives a file and stores it according to and will meet the received requirements

### build ###

docker build -t python-app2 .

### run ###

docker run -it -v C:\tasks2\asset-catalog\asset-catalog-assignment:/catalog --rm python-app2
cd src
python main
