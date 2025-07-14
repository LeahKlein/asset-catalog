const { writeToJson, readFromJson,checkIfPathNotExist, updateTheDirectory, checkIfAssetExist,checkIfNotFile } = require('../src/client');
const fs = require('fs');
const path = require('path');
let pathOfCache=path.join(__dirname,"./cache/assets.json")
describe("Write and update to the watch directory and check if the assets already exist",()=>{
    beforeAll(()=>{
        if(!fs.existsSync("test/cache")){
            fs.mkdirSync("test/cache")
        }
        fs.open("./cache/assets.json","w",()=>{})
    })
    it("should throw error if the path not exist",()=>{
        expect(()=>checkIfPathNotExist("dvori_aiger/ggg.txt")).toThrow("The path not exist")
    })
    it("should throw error if not file",()=>{
        expect(()=>checkIfNotFile("hello")).toThrow("Not file")
        expect(()=>checkIfNotFile("good")).toThrow("Not file")
    })
    it("should throw error if the asset already exist",()=>{
        let data=['one.txt','two.txt']
        writeToJson(data,pathOfCache);
        expect(()=>checkIfAssetExist("one.txt",pathOfCache)).toThrow("The asset is exist")
    })
    it("should update the asset in the json file", () => {
        let assets = readFromJson(pathOfCache)
        updateTheDirectory('good.txt',pathOfCache);
        expect(readFromJson(pathOfCache)).toEqual([...assets,'good.txt'])
    })
    it("should write to json file",()=>{
        writeToJson(['one.txt', 'two.txt'],pathOfCache)
        let data=readFromJson(pathOfCache)
        expect(data).toEqual(['one.txt','two.txt'])
    })
    afterAll(()=>{
        fs.unlinkSync(pathOfCache,()=>{})
        fs.rmdirSync("test/cache")
    })
})


