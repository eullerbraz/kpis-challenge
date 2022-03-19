const AnswerService = require('../services/Answer');

const getAll = async (_req, res) => {
  const answers = await AnswerService.getAll();

  return res.status(200).json(answers);
}

const create = async (req, res, next) => {
  const { code, message, answer } = await AnswerService.create(req.body);

  if (message) return next({ message, code });

  return res.status(201).json(answer);
}

module.exports = {
  getAll,
  create,
}