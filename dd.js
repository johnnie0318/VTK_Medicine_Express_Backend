const express = require('express');
const app = express(); // create express app
const proxy = require('express-http-proxy');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const folder = 'dist';

app.use(express.static(folder));
// app.use(express.json());
app.use(cors());
app.use('/proxy', proxy('http://lkmt.kometa-pacs.info'));

app.get('*', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, './dist/') });
});

app.post('/proxy', (req, res) => {
  console.log('****blob:', req.body);
  // console.log('**OK*****\n', req.data.username, '\n', req.data.password);
  // var imageBuffer = req.file.buffer;
  // var imageName = 'public/images/map.png';

  // fs.createWriteStream(imageName).write(imageBuffer);
});

// start express server on port 5000
app.listen(5000, '0.0.0.0', () => {
  console.log('server started on port 5000');
});
