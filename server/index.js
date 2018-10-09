const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '/../client/dist/'))).use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.jsx'));
});

console.log(path.join(__dirname, '../client/src', 'styles.css'));

app.listen(PORT, () => console.log(`Minesweeper listening on ${PORT}`));
