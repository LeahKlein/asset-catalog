let fs = require('fs');
let pathJson = '../.cache/watched-directory.json';
const axios = require('axios');

function readExistingAssets(path = pathJson) {
    let data = JSON.parse(fs.readFileSync(path));
    return Object.values(data);
}

function readNewAsset() {
    let newAsset = process.argv.slice(2);
    return newAsset;
}

function isExist(existingAssets, newAsset) {
    return existingAssets.includes(...newAsset);
}

function addNewAssetToCache(existingAssets, newAsset, path = pathJson) {
    existingAssets.push(...newAsset);
    let data = JSON.stringify(Object.assign({}, existingAssets));
    fs.writeFileSync(path, data);
}

function addNewAssetToServer(newAsset) {
    axios.post(`http://localhost:5000/`, newAsset)
        .then((response) => { console.log('Response from server:', response.data); })
        .catch((error) => { console.error('Error:', error.message) });
}

module.exports = { readExistingAssets, readNewAsset, isExist, addNewAssetToCache, addNewAssetToServer };
