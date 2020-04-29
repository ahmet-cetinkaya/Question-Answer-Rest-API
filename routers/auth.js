const express = require('express');
const { register, login, getUser } = require('../controllers/auth');
const { getAccessToRoute } = require('../middlewares/authorization/auth');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', getAccessToRoute, getUser);

module.exports = router;
