const fs = require('fs')
const axios = require('axios')
const pathToCache = './.cache/cache.json'
const ReadWriteLock = require('rwlock');
const lock = new ReadWriteLock();
const dotenv = require('dotenv')
dotenv.config()

const checkIfTheFileExistAndUpload = (nameOfFile) => {
    if (typeof (nameOfFile) != 'string') {
        throw Error('The name must be of type string')
    }
    try {
        lock.readLock((release) => {
            if (!ifFileExistInChache(pathToCache, nameOfFile)) {
                uploudFileToServer(nameOfFile)
                updateCacheWithNameOfNewFile(pathToCache, nameOfFile)
            }
            release()
        })
        return true
    }
    catch (error) {
        throw error
    }
}

const ifFileExistInChache = (pathToCache, file) => {
    if (typeof (pathToCache) != 'string')
        throw new Error('The path must be of type string')
    if (typeof (file) != 'string')
        throw new Error('The fileName must be of type string')
    const context = fs.readFileSync(pathToCache, 'utf8')
    const cacheFile = JSON.parse(context)
    if (cacheFile.nameOfFile.indexOf(file) == -1)
        return false
    return true
}

const uploudFileToServer = (file) => {
    axios.post(`http://${process.env.IP_ADRESS_SERVER}:${process.env.PORT}`, { file })
        .then((res) => {
            console.log(res.status);
        })
        .catch(error => {
            throw error
        })
}

const updateCacheWithNameOfNewFile = (pathToCache, newFile) => {
    try {
        const myObject = JSON.parse(fs.readFileSync(pathToCache))
        myObject.nameOfFile.push(newFile)
        const newData = JSON.stringify(myObject)
        fs.writeFileSync(pathToCache, newData)
        return true
    }
    catch (error) {
        throw error
    }
}

const readFromWatchedDirectory = (path = pathToCache) => {
    try {
        let content = fs.readFileSync(path, 'utf8')
        content = JSON.parse(content)
        console.log(content);
        return content
    }
    catch (error) {
        throw error
    }
}

module.exports = { checkIfTheFileExistAndUpload, ifFileExistInChache, readFromWatchedDirectory, updateCacheWithNameOfNewFile, uploudFileToServer }