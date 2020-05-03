const express = require('express');
const questions = require('./questions');
const auth = require('./auth');
const user = require('./user');
const router = express.Router();

router.use('/questions', questions);
router.use('/auth', auth);
router.use('/users', user);

module.exports = router;
