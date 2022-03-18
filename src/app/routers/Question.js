const express = require('express');
const rescue = require('express-rescue');

const QuestionController = require('../controllers/Question');

const router = express.Router({ mergeParams: true });

router.get('/', rescue(QuestionController.getAll));

module.exports = router;