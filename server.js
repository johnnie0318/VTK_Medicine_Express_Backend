const express = require('express');
const app = express(); // create express app
const proxy = require('express-http-proxy');
const path = require('path');
const cors = require('cors');
const folder = 'build';

app.use(express.static(folder));
app.use('/proxy', proxy('http://lkmt.kometa-pacs.info'));
app.use(cors);
app.use(express.json());
app.get('*', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, './build/') });
});

app.get('/', (req, res) => {
  fs.readdir('./public/cornerstone/studies/0', (err, files) => {
    const filesNames = files.join('",</br>"');
    for (const i in files) {
      const pathFile = `./public/cornerstone/studies/0/${files[i]}`;
      if (!pathFile.includes('.dcm'))
        fs.rename(pathFile, `${pathFile}.dcm`, () =>
          console.log('File renamed succesfully')
        );
    }
    res.send(`export default [${filesNames}]`);
  });
  // res.send('hello');
});

// start express server on port 5000
app.listen(5000, '0.0.0.0', () => {
  console.log('server started on port 5000');
});
