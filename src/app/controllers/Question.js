const QuestionService = require('../services/Question');

const getAll = async (_req, res) => {
  const questions = await QuestionService.getAll();

  return res.status(200).json(questions);
}

const create = async (req, res, next) => {
  const { code, message, question } = await QuestionService.create(req.body);

  if (message) return next({ message, code });

  return res.status(200).json(question);
}

module.exports = {
  getAll,
  create,
}