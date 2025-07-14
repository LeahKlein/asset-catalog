const { readExistingAssets, readNewAsset, isExist, addNewAssetToCache } = require('../src/functions');
let pathJson = './.cache/watched-directory.json';

test("Read existing assets", async () => {
    let expectedResult = await readExistingAssets(pathJson);
    let result = ['aa', 'bb', 'cc'];
    expect(result).toEqual(expectedResult);
});
test("Asset is exist", async () => {
    let existingAssets = await readExistingAssets(pathJson);
    let newAsset = ['aa'];
    let result = isExist(existingAssets, newAsset);
    expect(result).toEqual(true);
});
test("Asset is not exist", async () => {
    let existingAssets = await readExistingAssets(pathJson);
    let newAsset = ['dd'];
    let result = isExist(existingAssets, newAsset);
    expect(result).toBe(false);
});
test("Add new asset", async () => {
    let existingAssets = await readExistingAssets(pathJson);
    let newAsset = ['ff'];
    await addNewAssetToCache(existingAssets, newAsset, pathJson);
    let result = await readExistingAssets(pathJson);
    let expectedResult = ['aa', 'bb', 'cc', 'ff'];
    expect(result).toEqual(expectedResult);
});
