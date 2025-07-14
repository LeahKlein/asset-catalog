const { checkIfTheFileExistAndUpload, readFromWatchedDirectory } = require('./uploadFileAndWatchInCli.js')
const args = process.argv.splice(2)
const file = args[1]

switch (args[0]) {
    case 'uploadFile':
        checkIfTheFileExistAndUpload(file)
        break
    case 'read':
        readFromWatchedDirectory()
        break
    default:
        console.log('The command is not define');
}