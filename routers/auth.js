const express = require('express');
const {
  register,
  login,
  getUser,
  logout,
  forgotpassword,
  resetPassword,
} = require('../controllers/auth');
const { getAccessToRoute } = require('../middlewares/authorization/auth');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', getAccessToRoute, getUser);
router.get('/logout', getAccessToRoute, logout);
router.post('/forgotpassword', forgotpassword);
router.put('/resetpassword', resetPassword);

module.exports = router;
