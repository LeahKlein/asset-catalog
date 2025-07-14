const fs = require('fs');
const process = require('process');
const argv = process.argv
const axios = require('axios')
const path = require('path');
const AsyncLock = require('node-async-locks').AsyncLock;
const lock = new AsyncLock();
require('dotenv').config()
let pathOfTheCache=path.join(__dirname,"./cache/assets.json")

function readDataFromCLI() {
    const assets = argv.slice(2, argv.length)
    if (assets[assets.length - 1] === "assets_list")
        console.log(readFromJson());
    else{
        try {
            checkAndUpdateTheAssets(assets)
        } catch (error) {
            console.error(error.message);
        }
    }
}

function readFromJson(assetsPath=pathOfTheCache) {
    const data = fs.readFileSync(assetsPath, "utf8")
    return JSON.parse(data);
}

function checkAndUpdateTheAssets(assets) {
    assets.forEach(asset => {
            checkIfPathNotExist(asset)
            checkIfNotFile(asset.substring(asset.lastIndexOf('/'), asset.length))
            update(asset)
    })
}

function checkIfPathNotExist(asset) {
    if (!fs.existsSync(path.join(__dirname, `./../${asset}`))) {
        throw new Error("The path not exist");
    }
}

function checkIfNotFile(asset) {
    if (!asset.includes('.')) {
        throw new Error("Not file");
    }
}

function update(asset) {
    lock.enter(function (token) {
        try {
            checkIfAssetExist(asset)
            uploadAssetToServer(asset)
            updateTheDirectory(asset.substring(asset.lastIndexOf('/'), asset.length))
        } catch (error) {
            console.error(error.message)
        }
        lock.leave(token)
    })
}

function checkIfAssetExist(newAsset,assetsPath=pathOfTheCache) {
    const assets = readFromJson(assetsPath)
    if (assets.includes(newAsset)) {
        throw new Error("The asset is exist")
    }
}

function uploadAssetToServer(asset) {
    try {
        axios.post(`http://${process.env.HOST}:${process.env.PORT}/save`, { "asset": asset }).then(res => {
            console.log(res.data);
        })
    } catch (error) {
        console.error(error.message)
    }
}

function updateTheDirectory(asset,assetsPath=pathOfTheCache) {
    let data = readFromJson(assetsPath)
    const allAssets = [...data, asset]
    writeToJson(allAssets,assetsPath)
}

function writeToJson(assets,assetsPath=pathOfTheCache) {
    fs.writeFileSync(assetsPath, JSON.stringify(assets), (err) => { console.log(err);}) 
}

module.exports = {  readDataFromCLI, readFromJson, checkIfPathNotExist, checkIfNotFile, checkIfAssetExist, updateTheDirectory, writeToJson }
