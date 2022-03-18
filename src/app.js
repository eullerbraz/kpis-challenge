const express = require('express');
const { json } = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(json());

app.get('/questions', (req, res) => res.json({ itsOk: 'yes' }));

module.exports = app;