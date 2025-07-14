const fs = require('fs')
const AsyncLock = require('node-async-locks').AsyncLock
const lock = new AsyncLock()
const path = require('path')
const pathCache = path.join(__dirname, '/cache/assets.json')
const { basename } = require('path')
const { upload } = require('./connectServer.js')
const { checkPath, checkExist } = require('./check.js')

function updateAsset(path){
    checkPath(path)
    const asset = basename(path)
    lock.enter(function(token){
        try{
            const assets = readFromJson()
            checkExist(asset, assets)
            upload(asset)
            updateCache(asset, assets)
        }
        catch(e) { throw e }
        lock.leave(token)
    })
}

function updateCache(asset, assets, pathData){
    try {
        assets.push(asset)
        changeToJson(JSON.stringify(assets), pathData)
    } catch (e) { throw e }
    
}

function changeToJson(assets, pathData = pathCache){
    try { fs.writeFileSync(pathData, assets) } 
    catch (e) { throw e }
}

function readFromJson(pathData = pathCache){
    try {
        const data = fs.readFileSync(pathData, 'utf8')
        return JSON.parse(data)
    }
    catch (e) { throw e }
}

module.exports = { readFromJson, changeToJson, updateCache, updateAsset }