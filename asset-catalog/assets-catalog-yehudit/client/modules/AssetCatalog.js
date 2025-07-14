const AsyncLock = require('node-async-locks').AsyncLock
const { NewFile } = require('./NewFile.js')
const { readContentFromJson, appendFileToCache } = require('./cacheFunction.js')
const { uploadFileToServer } = require('./connection.js')

function assetCatalog(listOfInput) {

    if (listOfInput[0] === 'watch' || listOfInput[0] === '-w')
        console.log(readContentFromJson())

    else {
        listOfInput.forEach(f => {
            const file = new NewFile(f)
            const lock = new AsyncLock()
            lock.enter(function (token) {
                try {
                    if (file.isExistInCache())
                        console.log('exist!')
                    else {
                        uploadFileToServer(file.path)
                        appendFileToCache(file.fileName)
                    }
                    lock.leave(token)
                }
                catch (error) {
                    console.log(error.message);
                }

            })
        })
    }
}

assetCatalog(process.argv.slice(2))
