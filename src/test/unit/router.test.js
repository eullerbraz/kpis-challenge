const { expect } = require('chai');

const AnswerRouter = require('../../app/routers/Answer');
const app = require('../../app');

describe('Testa existencia do router e do app', () => {
  expect(AnswerRouter).exist;
  expect(app).exist;
});