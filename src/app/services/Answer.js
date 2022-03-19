const Joi = require('joi');

const AnswerModel = require('../models/Answer');

const quantityStrings = require('../data/quantityStrings');

const validateAnswer = (answer) => Joi.object({
  peopleQuantity: Joi.any().valid(...quantityStrings),
  satisfaction: Joi.number().integer().min(1).max(10),
}).validate(answer);

const getAll = async () => {
  const answers = await AnswerModel.getAll();
  return answers;
}


const create = async (answer) => {
  const { error } = validateAnswer(answer);

  if (error) {
    const [{ message }] = error.details;
    return { message, code: 400 };
  }

  const created = await AnswerModel.create(answer);

  return { answer: created }
}

module.exports = {
  getAll,
  create,
}