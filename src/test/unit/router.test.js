const { expect } = require('chai');

const QuestionRouter = require('../../app/routers/Question');

describe('Testa existencia do router', () => {
  expect(QuestionRouter).exist;
});