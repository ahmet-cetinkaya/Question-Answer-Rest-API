const express = require('express');
const { getSingleUser } = require('../controllers/user.js');
const { checkUserExists } = require('../middlewares/database/databaseErrorHelpers');

const router = express.Router();

router.get('/:id', checkUserExists, getSingleUser);

module.exports = router;
