const QuestionModel = require('../models/Question');

const getAll = async () => {
  const questions = await QuestionModel.getAll();
  return questions;
}

module.exports = {
  getAll,
}