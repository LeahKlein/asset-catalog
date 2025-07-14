const { readCache } = require('./functionsOnCache.js')
const { addNewAsset } = require('./addAsset.js')

function readFromCli() {

	if (process.argv[2] == 'w' || process.argv[2] == '-w' || process.argv[2] == 'watch') {
		const assets = readCache()
		console.log(assets);
	}
	if (process.argv[2] == 'u' || process.argv[2] == '-u' || process.argv[2] == 'update') {
		addNewAsset(process.argv[3])
	}
}

readFromCli()