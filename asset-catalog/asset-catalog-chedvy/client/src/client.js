const { readFromJson, updateAsset }  = require('./functionClient')
const process = require('process')

function readFromCLI(){
    switch (process.argv[3]) {
        case 'read':
            const assets = readFromJson()
            console.log(assets)
            break
        case 'update':
            updateAsset(process.argv[4])
            break
    }
}

readFromCLI()