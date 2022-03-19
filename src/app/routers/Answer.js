const express = require('express');
const rescue = require('express-rescue');

const AnswerController = require('../controllers/Answer');

const router = express.Router({ mergeParams: true });

router.get('/', rescue(AnswerController.getAll));
router.post('/', rescue(AnswerController.create));

module.exports = router;