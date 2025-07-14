const express = require('express');
const app = express();

app.post('/save', (req, res) => {
  res.send('save a file');
});

app.listen(3000,3000, () => {
  console.log('the srecdf');
});
