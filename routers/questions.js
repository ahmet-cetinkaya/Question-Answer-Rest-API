const express = require('express');
const { askNewQuestion, getAllQuestions } = require('../controllers/question');
const { getAccessToRoute } = require('../middlewares/authorization/auth');
const router = express.Router();

router.get('/', getAllQuestions);
router.get('/ask', getAccessToRoute, askNewQuestion);

module.exports = router;
