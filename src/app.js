const express = require('express');
const { json } = require('body-parser');
const cors = require('cors');

const QuestionRouter = require('./app/routers/Question');
const error = require('./app/middlewares/error');

const app = express();

app.use(cors());

app.use(json());

app.use('/question', QuestionRouter);

app.use(error);

module.exports = app;
