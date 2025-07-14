const express = require('express');
require('dotenv').config();
const Save = require('./save');

const app = express();
const { PORT, HOST } = process.env;

app.post('/', (req, res) => {
    const path = req.body.params;
    const save = new Save(path);
    save.correctPath();
    res.send({ params: 'succeeded!' });
});

app.listen(PORT, HOST, () => {
    console.log(`Server is running on port http://${HOST}:${PORT}/`);
});