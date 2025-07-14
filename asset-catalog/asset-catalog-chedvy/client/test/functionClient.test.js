const fs = require('fs')
const { rm } = require('fs/promises')
const { describe } = require('node:test')
const path = require('path')
const functionClient = require('../src/functionClient')

describe('write, read and update asset in cache', () => {
    beforeAll(() => {
        fs.mkdirSync('test/try')
        fs.writeFileSync('test/try/try.json', '[]',)
    })

    afterAll(async () => {
        await rm('test/try', { recursive: true })
    })

    const pathCache = path.join(__dirname, 'try/try.json')

    it('should change for the cache', () => {
        const assets = []
        functionClient.changeToJson(JSON.stringify(assets), pathCache)
        const data = fs.readFileSync(pathCache)
        expect(JSON.parse(data)).toEqual(assets)
    })
    it('should read from the cache', () => {
        const assets1 = require('./try/try.json')
        const assets2 = functionClient.readFromJson(pathCache)
        expect(assets1).toEqual(assets2)
    })
    it('should update the cache', () => {
        const assetsBefore = functionClient.readFromJson(pathCache)
        functionClient.updateCache('test/try.ts', assetsBefore, pathCache)
        const assetsAfter = functionClient.readFromJson(pathCache)
        expect(assetsAfter).toContain('test/try.ts', assetsBefore)
    })
})