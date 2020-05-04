const express = require('express');
const { getAccessToRoute, getAdminAccess } = require('../middlewares/authorization/auth');
const { blockUser, deleteUser } = require('../controllers/admin');
const { checkUserExist } = require('../middlewares/database/databaseErrorHelpers');
const router = express.Router();

router.use([getAccessToRoute, getAdminAccess]);

router.get('/block/:id', checkUserExist, blockUser);
router.delete('/user/:id', checkUserExist, deleteUser);
module.exports = router;
