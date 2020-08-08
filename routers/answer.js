const express = require('express');
const router = express.Router({ mergeParams: true });

const { getAccessToRoute } = require('../middlewares/authorization/auth');
const { addNewAnswerToQuestion } = require('../controllers/answer');

router.post('/', getAccessToRoute, addNewAnswerToQuestion);

module.exports = router;
