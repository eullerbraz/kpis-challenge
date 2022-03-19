const express = require('express');
const rescue = require('express-rescue');

const QuestionController = require('../controllers/Question');

const router = express.Router({ mergeParams: true });

router.get('/', rescue(QuestionController.getAll));
router.post('/', rescue(QuestionController.create));

module.exports = router;