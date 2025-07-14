const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
const asyncLock = require('async-lock');
const lock = new asyncLock();
const watchedDirectory = './watched';
const uploadDirectory = './uploads';
const stateFilePath = path.join(__dirname, 'uploaded_files.json');

function checkAndCreateDirectories() {
    if (!fs.existsSync(watchedDirectory)) {
        fs.mkdirSync(watchedDirectory);
        console.log(`Directory ${watchedDirectory} created.`);
    }
    if (!fs.existsSync(uploadDirectory)) {
        fs.mkdirSync(uploadDirectory);
        console.log(`Directory ${uploadDirectory} created.`);
    }
}

function saveUploadedFiles(fileNames) {
    try {
        let existingFiles = [];
        if (fs.existsSync(stateFilePath)) {
            const data = fs.readFileSync(stateFilePath);
            existingFiles = JSON.parse(data);
        }
        existingFiles.push(...fileNames.filter(file => !existingFiles.includes(file)));
        fs.writeFileSync(stateFilePath, JSON.stringify(existingFiles, null, 2));
    } catch (error) {
        throw new Error(`Error saving uploaded files: ${error.message}`);
    }
}

function uploadFile(filePath) {
    try {
        const fileName = path.basename(filePath);
        const destinationPath = path.join(uploadDirectory, fileName);
        fs.copyFileSync(filePath, destinationPath);
    } catch (error) {
        throw new Error(`Error uploading file ${filePath}: ${error.message}`);
    }
}

function readFile(filePath) {
    if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        console.log(`Content of ${filePath}:\n${content}`);
    } else {
        console.log(`File ${filePath} does not exist.`);
    }
}

function watchDirectory() {
    checkAndCreateDirectories();
    chokidar.watch(watchedDirectory).on('all', (event, filePath) => {
        if (event === 'add' || event === 'change') {
            const fileName = path.basename(filePath);
            lock.acquire('fileUploadLock', (done) => {
                uploadFile(filePath);
                saveUploadedFiles([fileName]);
                done();
            });
        }
    });
}

module.exports = { watchDirectory, uploadFile, readFile };
