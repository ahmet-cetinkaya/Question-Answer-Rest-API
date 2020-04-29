const express = require('express');
const { register, getUser } = require('../controllers/auth');
const { getAccessToRoute } = require('../middlewares/authorization/auth');
const router = express.Router();

router.post('/register', register);
router.get('/profile', getAccessToRoute, getUser);

module.exports = router;
