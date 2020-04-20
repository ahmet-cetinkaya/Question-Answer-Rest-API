const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.send('Questions Homepage');
});

router.get('/delete', (req, res, next) => {
  res.send('Questions Delete Page');
});
module.exports = router;
