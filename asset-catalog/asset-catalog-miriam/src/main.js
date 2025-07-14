const { readExistingAssets, readNewAsset, isExist, addNewAssetToCache, addNewAssetToServer } = require('./functions');

let lock = true;
if (lock) {
    main();
}

function main(newAsset = readNewAsset()) {
    lock = false;
    let existingAssets = readExistingAssets();
    if (isExist(existingAssets, newAsset)) {
        console.log("Is already exist");
    }
    else {
        addNewAssetToCache(existingAssets, newAsset);
        addNewAssetToServer(newAsset);
        console.log("Added successfully");
    }
    lock = true;
}