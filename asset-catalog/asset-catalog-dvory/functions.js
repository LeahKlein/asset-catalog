const fs = require('fs');
const axios = require('axios');
const ReadWriteLock = require('rwlock');
const lock = new ReadWriteLock();

const getFilesInCache = () => {
    const data = fs.readFileSync('./.cache/cache.json', 'utf8');
    return JSON.parse(data)['files'] === undefined ? ['no file'] : JSON.parse(data)['files'];
}

const saveNewFile = (fileName) => {
    lock.readLock(async function (release) {
        if (!hasArrayIncludeFile(getFilesInCache(), fileName)) {
            try {
                saveInCache(fileName);
                await uploadFile(fileName);
            } catch (error) {
                throw error;
            }
        }
        release();
    });
}

const uploadFile = async (file) => {
    try {
        const response = await axios.post(`http://localhost:3000/save`, {
            body: file,
            userId: 1
        });
    } catch (error) {
        throw error;
    }
}

const saveInCache = (fileName) => {
    const files = arrangeFilesArray(fileName);
    fs.writeFileSync('./.cache/cache.json', JSON.stringify({ files }));
}

const arrangeFilesArray = (fileName) => {
    var files = getFilesInCache();
    files.push(fileName);
    files = removeEmptyFile(files);
    return files;
}

const removeEmptyFile = (array) => {
    array.indexOf('no file') != -1 ? array.splice(array.indexOf('no file'), 1) : '';
    return array;
}

const hasArrayIncludeFile = (array, fileName) => {
    return array.includes(fileName);
}

module.exports = { getFilesInCache, saveInCache, saveNewFile, uploadFile, removeEmptyFile, arrangeFilesArray, hasArrayIncludeFile };
