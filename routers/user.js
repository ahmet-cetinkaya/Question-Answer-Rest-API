const express = require('express');
const { getSingleUser, getAllUser } = require('../controllers/user.js');
const { checkUserExist } = require('../middlewares/database/databaseErrorHelpers');
const userQueryMiddleware = require('../middlewares/query/userQueryMiddleware');
const User = require('../models/User');

const router = express.Router();

router.get('/', userQueryMiddleware(User), getAllUser);
router.get('/:id', checkUserExist, getSingleUser);

module.exports = router;
