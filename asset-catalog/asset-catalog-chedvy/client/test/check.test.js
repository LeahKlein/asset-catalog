const { describe } = require('node:test')
const check = require('../src/check')

describe('check path', () =>{
    it('should throw error if path is not string', () => {
        expect(() => check.checkIfString(123)).toThrow('The path must be a string')
    })
    it('should throw error if path is empty', () => {
        expect(() => check.checkEmpty('')).toThrow('The path is empty')
    })
    it('should not throw error if path is valid', () => {
        expect(() => check.checkPath('test/path.js')).undefined
    })
})
describe('check exist', () =>{
    it('Should throw an error if asset already exists', () => {
        expect(() => check.checkExist('test/path.js', ['test/path.js'])).toThrow('The asset is exist')
    })
    it('should not throw error if path not exists', () => {
        expect(() => check.checkExist('test/non-existe.js', [])).undefined
    })
})