const { checkUrl, checkIfExist } = require('../src/addAsset.js')
const fs = require('fs')
const path = require('path')

describe('check function checkIfExist', () => {
	it('should throw error if the asset is already exist', () => {
		expect(() => checkIfExist("yy.test.js", ['yy.test.js', 'gg.txt'])).toThrow('the asset is exist already')
	})
	it('should not throw if the asset is not exist', () => {
		expect(checkIfExist("pp.md", ['yy.test.js', 'gg.txt'])).toBe(undefined)
	})
})

describe('check function checkUrl', () => {
	it('should throw error if the url is not exist or written wrong', () => {
		expect(() => checkUrl('/cbhd/dfkjb/ergr')).toThrow('the file is not exist!')
		expect(() => checkUrl('/catalog/client/src/client')).toThrow('the file is not exist!')
	})
	it('should not throw if the url is exist', () => {
		expect(checkUrl(path.join(__dirname, "./functionsOnCache.test.js"))).toBe(undefined)
	})

})