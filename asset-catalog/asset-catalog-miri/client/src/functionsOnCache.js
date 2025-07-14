const fs = require('fs')
const path = require("path");
const cachePath = path.join(__dirname, '../cache/assets.json')

function readCache(dataPath = cachePath) {
	try {
		const data = fs.readFileSync(dataPath, 'utf8')
		return JSON.parse(data);
	}
	catch (err) {
		throw err;
	}
}

function updateCache(assetName, assets, dataPath = cachePath) {
	assets.push(assetName)
	writeCache(JSON.stringify(assets), dataPath);
}

function writeCache(assets, dataPath = cachePath) {
	try {
		fs.writeFileSync(dataPath, assets)
	}
	catch (err) {
		throw err
	}
}

module.exports = {
	updateCache, readCache, writeCache
}