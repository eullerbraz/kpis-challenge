const Joi = require('joi');

const QuestionModel = require('../models/Question');

const questionsType = require('../data/questions');

const answerType = require('../data/answers');

const validateQuestion = (question) => Joi.object({
  title: Joi.any().valid(...questionsType),
  answer: Joi.any().valid(...answerType),
}).validate(question);

const getAll = async () => {
  const questions = await QuestionModel.getAll();
  return questions;
}


const create = async (question) => {
  const { error } = validateQuestion(question);

  if (error) {
    const [{ message }] = error.details;
    return { message, code: 400 };
  }

  const created = await QuestionModel.create(question);

  return { question: created }
}

module.exports = {
  getAll,
  create,
}