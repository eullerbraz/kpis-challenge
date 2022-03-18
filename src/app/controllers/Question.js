const QuestionService = require('../services/Question');

const getAll = async (_req, res) => {
  const questions = await QuestionService.getAll();

  return res.status(200).json(questions);
}

module.exports = {
  getAll,
}