const { cliActives, watchOrUpload, watch, fileName, correctPath, writeToFilesNameJson,
    readTheFilesNameJson, findFileNameExist } = require('./../src/assetCatalog');

describe("ASSET_CATALOG", () => {
    it('should log the files that in watch directory', () => {
        const logSpy = jest.spyOn(global.console, 'log');
        const watch = jest.fn().mockImplementation(() => console.log(['filesName.json', 'files.js', 'app.js', 'init.js']))
        watch();
        expect(logSpy).toHaveBeenCalled();
        expect(logSpy).toHaveBeenCalledWith(['filesName.json', 'files.js', 'app.js', 'init.js']);
    })
    it('should return true that exist watch', () => {
        let result = watchOrUpload('watch');
        expect(result).toBe(true);
    })
    it('should return false that not watch', () => {
        let result = watchOrUpload('/app/.gitignore');
        expect(result).toBe(false);
    })
    it('should log the files name that in watch directory', async () => {
        const logSpy = jest.spyOn(global.console, 'log');
        const cliActives = jest.fn().mockImplementation(() => console.log(['filesName.json', 'files.js', 'app.js', 'init.js']));
        await cliActives('-w');
        expect(logSpy).toHaveBeenCalled();
        expect(logSpy).toHaveBeenCalledWith(['filesName.json', 'files.js', 'app.js', 'init.js']);
    })
    it('should log that not contains asset', async () => {
        const logSpy = jest.spyOn(global.console, 'log');
        await cliActives();
        expect(logSpy).toHaveBeenCalled();
        expect(logSpy).toHaveBeenCalledWith("enter your asset!");
    })
    it('should return file name from url', () => {
        let result = fileName("/app/presence.xlsx");
        expect(result).toBe('presence.xlsx');
    })
    it('should return folder name from url', () => {
        let result = fileName("/app");
        expect(result).toBe('app');
    })
    it('should return that the file exist', () => {
        let result = correctPath(__dirname + "/assetCatalog.test.js");
        expect(result).toBe(true);
    })
    it('should return that the file not exist', () => {
        let result = correctPath("/app/try.xlsx");
        expect(result).toBe(false);
    })
    it('should return false that send path of folder', () => {
        let result = correctPath("/app/.cache");
        expect(result).toBe(false);
    })
    it('should log that the file not exist', () => {
        const logSpy = jest.spyOn(global.console, 'log');
        correctPath();
        expect(logSpy).toHaveBeenCalled();
        expect(logSpy).toHaveBeenCalledWith('Not send path.');
    })
    it('should return undefined when the file name not exist', () => {
        const findFileNameExist = jest.fn().mockImplementation(() => { return undefined });
        let result = findFileNameExist('presence.xlsx');
        expect(result).toBe(undefined);
    })
    it('should return the name of the file that exist', () => {
        const findFileNameExist = jest.fn().mockImplementation(() => { return 'init.js' });
        let result = findFileNameExist('init.js');
        expect(result).toBe('init.js');
    })
    it('should return the cache in json', async () => {
        const readTheFilesNameJson = jest.fn().mockImplementation(() => { return ["filesName.json", "files.js", "app.js", "init.js"] });
        let result = await readTheFilesNameJson();
        expect(typeof (result)).toBe("object");
        expect(result).toContainEqual("filesName.json", "files.js", "app.js", "init.js");
    })
    it('should return the cache with the name that write to cache', () => {
        const readTheFilesNameJson = jest.fn().mockImplementation(() => { return ["filesName.json", "files.js", "app.js", "init.js", "save.js"] });
        const writeToFilesNameJson = jest.fn().mockImplementation(() => { readTheFilesNameJson(); });
        writeToFilesNameJson('save.js');
        let result = readTheFilesNameJson();
        expect(result).toContainEqual("save.js");
    })
})