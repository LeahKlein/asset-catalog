const express = require("express");
const fs = require('fs')
const path = require("path");
const dotenv = require('dotenv');
const app = express();
dotenv.config({ path: path.join(__dirname, "./.env") })
const port = process.env.PORT;

app.post('/upload', function (req, res) {
	req.pipe(fs.createWriteStream(`assets/${req.query.filename}`))
	res.send('uploaded')
});

app.get('/', function (req, res) {
	res.send('welcome to asset-catalog');
});

app.listen(port, () => {
	console.log(`Running at Port ${port}`);
});