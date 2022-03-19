const { expect } = require('chai');

const AnswerRouter = require('../../app/routers/Answer');

describe('Testa existencia do router', () => {
  expect(AnswerRouter).exist;
});