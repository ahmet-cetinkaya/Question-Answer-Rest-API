const express = require('express');
const {
  register,
  login,
  getUser,
  logout,
  imageUpload,
  forgotpassword,
  resetPassword,
} = require('../controllers/auth');
const { getAccessToRoute } = require('../middlewares/authorization/auth');
const { profileImageUpload } = require('../middlewares/libraries/profileImageUpload');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', getAccessToRoute, getUser);
router.get('/logout', getAccessToRoute, logout);
router.post('/upload', [getAccessToRoute, profileImageUpload.single('profile_image')], imageUpload);
router.post('/forgotpassword', forgotpassword);
router.put('/resetpassword', resetPassword);

module.exports = router;
