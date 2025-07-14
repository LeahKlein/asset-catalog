const pathPackage = require('path')
const fs = require('fs')
const { readContentFromJson } = require('./cacheFunction.js')

class NewFile {

    constructor(path) {
        this.path = path
        this.fileName = pathPackage.basename(this.path)
    }

    checkValid() {
        if (this.path.length == 0)
            throw new Error('no argument')
        if (fs.existsSync(this.path)) {
            if (fs.lstatSync(this.path).isDirectory())
                throw new Error('no file')
        }
        else
            throw new Error('no exist')
        return true
    }

    isExistInCache(pathOfCache = pathPackage.join(__dirname, '../.cache/files.json')) {
        this.checkValid()
        if (readContentFromJson(pathOfCache).includes(this.fileName))
            return true
        return false
    }
}

module.exports = { NewFile }
