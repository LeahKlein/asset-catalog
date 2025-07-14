require('dotenv').config();
const axios = require('axios');
const { basename } = require('path');
const { existsSync, lstatSync, writeFileSync, readFileSync } = require('fs');
const AsyncLock = require('async-lock');
var lock = new AsyncLock();

let cacheFile = process.env.CACHE_PATH;

async function start() {
    let cmd = process.argv.slice(2);
    await cliActives(cmd);
}

async function cliActives(files = []) {
    if (files.length > 0)
        if (watchOrUpload(files[0]))
            watch();
        else files.forEach(async file => watchFile(file));
    else console.log("enter your asset!");
}

function watchOrUpload(file) {
    return file == 'watch' || file == '-w';
}

function watch() {
    watch = readTheFilesNameJson();
    console.log(watch);
}

function fileName(path) {
    return basename(path);
}

function correctPath(path) {
    if (!path)
        console.log("Not send path.");
    else
        return existsSync(path) && !lstatSync(path).isDirectory();
}

async function watchFile(fileName) {
    await lock.acquire(cacheFile, async () => {
        let findFile = findFileNameExist(fileName);
        if (findFile === undefined) {
            await connectToServer();
            writeToFilesNameJson(fileName);
            return;
        }
    }), () => {
        throw new Error(`The file ${fileName} - exist`);
    }
}

async function connectToServer() {
    await axios.post(process.env.SERVER_PATH, { params: this.path })
        .then(res => {
            console.log(res.data.params);
        })
        .catch(error => {
            console.log(error);
        })
}

function writeToFilesNameJson(fileName) {
    const data = readTheFilesNameJson();
    try {
        data.push(fileName);
        let json = JSON.stringify(data);
        writeFileSync(cacheFile, json);
    }
    catch (error) {
        throw error;
    }
}

function readTheFilesNameJson() {
    let data;
    try {
        data = readFileSync(cacheFile);
    }
    catch (error) {
        throw error;
    }
    return JSON.parse(data);
}

function findFileNameExist(fileName) {
    let filesName = readTheFilesNameJson();
    return filesName.find(filename => filename === fileName);
}

module.exports = {
    start,
    cliActives,
    watchOrUpload,
    watch,
    watchFile,
    fileName,
    correctPath,
    connectToServer,
    writeToFilesNameJson, readTheFilesNameJson,
    findFileNameExist
}