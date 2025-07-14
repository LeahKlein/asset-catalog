const fs = require('fs')
const axios = require('axios');
const { basename } = require('path');
const { readCache, updateCache } = require('./functionsOnCache')
require('dotenv').config()
const AsyncLock = require('node-async-locks').AsyncLock;

const host = process.env.HOST;
const port = process.env.PORT;

const lock = new AsyncLock();

function addNewAsset(assetUrl) {
	checkUrl(assetUrl)
	const assetName = basename(assetUrl)
	lock.enter(function (token) {
		try {
			const assets = readCache()
			checkIfExist(assetName, assets)
			updateServer(assetName)
			updateCache(assetName, assets)
		}
		catch (err) {
			throw err
		}
		lock.leave(token)
	})
}

function updateServer(assetName, serverUrl = `${host}:${port}/upload/`) {
	try {
		axios.post(serverUrl, {
			params: { filename: assetName }

		}).then((res) => {
			console.log(res.data);
		})
	}
	catch (err) {
		throw err;
	}
}

function checkUrl(url) {
	if (fs.existsSync(url) == false) {
		throw new Error('the file is not exist!')
	}
}

function checkIfExist(assetName, assets) {
	if (assets.includes(assetName)) {
		throw new Error('the asset is exist already');
	}
}

module.exports = {
	addNewAsset, checkUrl, checkIfExist
}