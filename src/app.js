const express = require('express');
const { json } = require('body-parser');
const cors = require('cors');

const AnswerRouter = require('./app/routers/Answer');
const error = require('./app/middlewares/error');

const app = express();

app.use(cors());

app.use(json());

app.use('/answers', AnswerRouter);

app.use(error);

module.exports = app;
