const express = require('express');
const path = require('path');
const opn = require('opn');

const app = express();
app.set('port', process.env.PORT || 1131);
const router = express.Router();
const sourcePath = path.join(__dirname, '/src/');
app.use(express.static(sourcePath));

router.get('/', (req, res) => {
  res.sendFile(`${sourcePath}index.html`);
});
router.get('*', (req, res) => {
  res.sendFile(`${sourcePath}404.html`);
});

app.use('/', router);

app.listen(app.get('port'), () => {
  // const url = `http://localhost:${app.get('port')}`;
  // Opn(url);
});
