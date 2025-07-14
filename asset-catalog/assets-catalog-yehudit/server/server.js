const express = require('express')
require('dotenv').config()

const app = express()
const PORT = process.env.PORTSERVER || 7070

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.post('/', (req, res) => {
    res.send('uploaded')
})

app.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}/`)
})
