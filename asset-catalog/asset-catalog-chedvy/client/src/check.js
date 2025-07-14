const fs = require('fs')

function checkPath(path){
    checkEmpty(path)
    checkIfString(path)
    if(!fs.existsSync(path)) 
        throw new Error("The path not found")
}

function checkIfString(path){
    if(typeof path!=='string') throw new Error("The path must be a string")
}

function checkEmpty(path){
    if(path.trim() === '') throw new Error("The path is empty")
}

function checkExist(asset, assets){
    if(assets.includes((asset))) throw new Error("The asset is exist")
}

module.exports = { checkPath, checkIfString, checkEmpty, checkExist }