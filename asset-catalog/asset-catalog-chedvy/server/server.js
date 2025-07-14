const express = require('express')
const dotenv = require('dotenv')
const path = require("path")
const fs = require('fs') 
const app = express()
const result = dotenv.config({ path: path.join(__dirname, "../.env") })
const port = result.parsed.PORT

app.post('/upload', (req, res) => {
    req.pipe(fs.createWriteStream(`assets/${req.query.file}`))
    res.send('File uploaded successfully')
})
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})