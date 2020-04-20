const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.send('Auth');
});

router.get('/register', (req, res, next) => {
  res.send('register');
});
module.exports = router;
