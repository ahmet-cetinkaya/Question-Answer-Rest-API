const express = require('express');
const router = express.Router({ mergeParams: true });

const { getAccessToRoute } = require('../middlewares/authorization/auth');
const { addNewAnswerToQuestion, getAllAnswerByQuestion } = require('../controllers/answer');

router.post('/', getAccessToRoute, addNewAnswerToQuestion);
router.get('/', getAllAnswerByQuestion);

module.exports = router;
