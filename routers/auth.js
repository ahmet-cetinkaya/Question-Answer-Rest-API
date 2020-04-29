const express = require('express');
const { register, tokentest } = require('../controllers/auth');
const { getAccessToRoute } = require('../middlewares/authorization/auth');
const router = express.Router();

router.post('/register', register);
router.get('/tokentest', getAccessToRoute, tokentest);

module.exports = router;
