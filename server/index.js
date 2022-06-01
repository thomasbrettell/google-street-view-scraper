require('dotenv').config();
const express = require('express');
const app = express();
const port = 3001;
const tinify = require('tinify');
const bodyParser = require('body-parser');
const fs = require('fs');

const jsonParser = bodyParser.json({ limit: '50mb' });

tinify.key = process.env.TINIFY_API_KEY;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.post('/tinify', jsonParser, (req, res) => {
  const buff = Buffer.from(req.body.data, 'base64');

  tinify.fromBuffer(buff).toBuffer(function (err, resultData) {
    if (err) throw err;
    fs.writeFileSync('tiny.jpg', resultData);
    res.send({ status: 'SUCCESS' });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});
