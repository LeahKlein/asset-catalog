const fs = require('fs')
const path = require('path')
const { readContentFromJson, writeToJsonFile, appendFileToCache } = require('../modules/cacheFunction.js')

describe('READ FROM JSON WRITE TO JSON AND UPDATE FUNCTIONS', () => {

    beforeEach(() => {
        fs.writeFileSync('test/example.json', '[]')
    })

    afterEach(() => {
        fs.unlinkSync(filePath);
    })

    const filePath = path.join(__dirname, './example.json')

    it('read content from json file', () => {
        expect(typeof readContentFromJson(filePath)).toEqual('object')
    })

    it('write content to json file', () => {
        writeToJsonFile('hello.txt', filePath)
        expect(readContentFromJson(filePath).includes('hello.txt')).toBe(true)

    })

    it('append file name to cache file', () => {
        expect(readContentFromJson(filePath).includes('hello.txt')).toBe(false)
        appendFileToCache('hello.txt', filePath)
        expect(readContentFromJson(filePath).includes('hello.txt')).toBe(true)
        expect(readContentFromJson(filePath).includes('wow.txt')).toBe(false)
        appendFileToCache('wow.txt', filePath)
        expect(readContentFromJson(filePath).includes('wow.txt')).toBe(true)
    })

})
