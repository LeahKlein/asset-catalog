const dotenv = require('dotenv')
const path = require('path')
const axios = require('axios')
const result = dotenv.config({ path: path.join(__dirname, '../../.env') })
const host = result.parsed.HOST
const port = result.parsed.PORT

function upload(asset, url = `http://${host}:${port}/upload`) {
	try {
		axios.post(url, {
            params: { filename: asset }
        }).then((res) => { console.log(res.data) })
	}
	catch (e) { throw e }
}

module.exports = { upload }