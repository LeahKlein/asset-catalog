const { NewFile } = require("../modules/NewFile.js");
const fs = require('fs')
const path = require('path')

describe('CHECK PATH', () => {

    it('correct syntax', () => {
        expect(new NewFile(path.join(__dirname, "./NewFile.test.js")).checkValid()).toBe(true)
        expect(() => { new NewFile("").checkValid() }).toThrow('no argument')
        expect(() => {new NewFile(path.join(__dirname, "./.cache/my.pdf")).checkValid()}).toThrow('no exist')
        expect(() => {new NewFile(path.join(__dirname, "../test")).checkValid()}).toThrow('no file')
    })
})

describe('CHECK IS EXIST FUNCTION', () => {

    beforeAll(() => {
        fs.writeFileSync('test/example.json', `["example.json"]`)
    })

    it('return correct answer', () => {
        let url = path.join(__dirname, './example.json')
        expect(new NewFile(path.join(__dirname, './example.json')).isExistInCache(url)).toBe(true)
        expect(new NewFile(path.join(__dirname, './NewFile.test.js')).isExistInCache(url)).toBe(false)
    })

    afterAll(() => {
        fs.unlinkSync('test/example.json')
    })

})
