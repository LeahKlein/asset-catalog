const { checkIfTheFileExistAndUpload, ifFileExistInChache, readFromWatchedDirectory, updateCacheWithNameOfNewFile } = require('../src/uploadFileAndWatchInCli.js')
const path = require('path')
const fs = require('fs')
const pathToCache = path.join(__dirname, 'cache.json')
const uploudFileToServer = jest.fn('nameOfFile')
uploudFileToServer.mockReturnValueOnce('OK')

function createFile() {
    const newFile = path.join(__dirname, 'cache.json')
    fs.writeFileSync(newFile, "{\"nameOfFile\":[\"video\",\"book\"]}")
}

function deleteFile() {
    fs.unlink(path.join(__dirname, 'cache.json'), (err) => {
        if (err) throw err
    })
}

beforeAll(() => {
    createFile()
})

afterAll(() => {
    deleteFile()
})

describe('checkIfTheFileExistAndUpload', () => {
    it('The function receives a file name and uploads the file if it does not exist in the cache', () => {
        const file = checkIfTheFileExistAndUpload('file.js')
        expect(file).toBe(true)
    })

    describe('ERRORS', () => {
        it('The function should accept a file name of type string', () => {
            expect(() => checkIfTheFileExistAndUpload(true)).toThrow('The name must be of type string')
            expect(() => checkIfTheFileExistAndUpload(1)).toThrow('The name must be of type string')
            expect(() => checkIfTheFileExistAndUpload({})).toThrow('The name must be of type string')
            expect(() => checkIfTheFileExistAndUpload([1, 2])).toThrow('The name must be of type string')
            expect(() => checkIfTheFileExistAndUpload(() => { })).toThrow('The name must be of type string')
        })
    })
})

describe('ifFileExistInChache', () => {
    it('The function return true if the file exists in the cache', () => {
        const result = ifFileExistInChache(pathToCache, 'video')
        expect(result).toEqual(true)
    })

    it('The function return false if the file  nor exists in the cache', () => {
        const result = ifFileExistInChache(pathToCache, 'file.js')
        expect(result).toEqual(false)
    })

    describe('ERRORS', () => {
        it('The function should accept a path of type string', () => {
            expect(() => ifFileExistInChache(true, 'file.js')).toThrow('The path must be of type string')
            expect(() => ifFileExistInChache([1, 2], 'file.js')).toThrow('The path must be of type string')
            expect(() => ifFileExistInChache(() => { }, 'file.js')).toThrow('The path must be of type string')
            expect(() => ifFileExistInChache(2, 'file.js')).toThrow('The path must be of type string')
            expect(() => ifFileExistInChache({ 'key': 'value' }, 'file.js')).toThrow('The path must be of type string')
        })

        it('The function should accept a file name of type string', () => {
            expect(() => ifFileExistInChache(pathToCache, true)).toThrow('The fileName must be of type string')
            expect(() => ifFileExistInChache(pathToCache, 1)).toThrow('The fileName must be of type string')
            expect(() => ifFileExistInChache(pathToCache, [1, 2])).toThrow('The fileName must be of type string')
            expect(() => ifFileExistInChache(pathToCache, () => { })).toThrow('The fileName must be of type string')
            expect(() => ifFileExistInChache(pathToCache, { 'key': 'value' })).toThrow('The fileName must be of type string')
        })
    })
})

describe('uploudFileToServer', () => {
    it('The function returns OK when there is a connection to the server', () => {
        expect(uploudFileToServer()).toEqual('OK')
    })
})

describe('readFromWatchedDirectory', () => {
    it('The function reads from the cache and returns the contents', () => {
        const file = readFromWatchedDirectory(pathToCache)
        expect(file).toEqual({ "nameOfFile": ["video", "book"] })
    })

    describe('ERRORS', () => {
        it('The function throws an error if it does not receive a invalid path', () => {
            expect(() => readFromWatchedDirectory({})).toThrow()
        })
    })
})

describe('updateCacheWithNameOfNewFile', () => {
    it('The function receives a file name and updates in chach', () => {
        const result = updateCacheWithNameOfNewFile(pathToCache, 'new.pdf')
        expect(result).toEqual(true)
    })
})