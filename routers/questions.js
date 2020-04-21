const express = require('express');
const { getAllQuestions } = require('../controllers/question');
const router = express.Router();

router.get('/', getAllQuestions);

module.exports = router;
