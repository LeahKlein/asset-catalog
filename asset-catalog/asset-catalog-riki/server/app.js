const express = require('express');
const app = express();
const cors = require('cors')

app.use(cors())

const port = 3000;

app.get("/", (req, res) => {
    res.send("✔ saved");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});