const { writeCache, updateCache, readCache } = require('../src/functionsOnCache.js')
const fs = require('fs')
const { rm } = require('fs/promises')
const path = require("path");

describe('read, write and update cache', () => {

	beforeAll(() => {
		fs.mkdirSync('tests/try')
		fs.writeFileSync('tests/try/try.json', '[]',)
	})

	afterAll(() => {
		rm("tests/try", { recursive: true })
	})

	const dataPath = path.join(__dirname, 'try/try.json')

	it('should write for the cache example', () => {
		const arrExample = ["tt.txt", "tt.png"]
		writeCache(JSON.stringify(arrExample), dataPath)
		const data = fs.readFileSync(dataPath)
		expect(JSON.parse(data)).toEqual(arrExample)
	})

	it('should return the data from the cache example', () => {
		const data1 = require('./try/try.json')
		const data2 = readCache(dataPath)
		expect(data1).toEqual(data2)

	})

	it('should update the cache example', () => {
		const dataBefore = readCache(dataPath)
		updateCache('try.ts', dataBefore, dataPath)
		const dataAfter = readCache(dataPath)
		expect(dataAfter).toContain('try.ts', dataBefore)
	})

})