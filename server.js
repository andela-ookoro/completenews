const express = require('express');
const path = require('path');

const app = express();
app.set('port', process.env.PORT || 1142);
const router = express.Router();
const fpath = path.join(__dirname);
app.use(express.static(__dirname + '/src'));
app.use(express.static(fpath));
router.get('/', (req, res) => {
  res.sendFile(fpath + '/src/index.html');
});
router.get('*', (req, res) => {
  res.send('404 not found');
});
app.use('/', router);

app.listen(app.get('port'), function () {
    console.log('Completenews running at  http://localhost:' + app.get('port'));
});
