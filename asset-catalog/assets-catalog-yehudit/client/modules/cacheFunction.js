const fs = require('fs')
const path = require('path')

const cachePath = path.join(__dirname, '../.cache/files.json')

function readContentFromJson(fileUrl = cachePath) {
    let content = fs.readFileSync(fileUrl, 'utf8')
    return JSON.parse(content)
}

function writeToJsonFile(content, fileUrl = cachePath) {
    content = JSON.stringify(content)
    fs.writeFileSync(fileUrl, `${content}`)
}

function appendFileToCache(fileName, fileUrl = cachePath) {
    let content = readContentFromJson(fileUrl)
    content.push(fileName)
    writeToJsonFile(content, fileUrl)
}

module.exports = { readContentFromJson, writeToJsonFile, appendFileToCache }
