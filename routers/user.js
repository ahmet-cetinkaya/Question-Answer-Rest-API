const express = require('express');
const { getSingleUser } = require('../controllers/user.js');

const router = express.Router();

router.get('/:id', getSingleUser);

module.exports = router;
