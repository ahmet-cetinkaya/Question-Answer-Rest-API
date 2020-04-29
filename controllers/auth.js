const User = require('../models/User');
const CustomError = require('../helpers/error/CustomError');
const asyncErrorWrapper = require('express-async-handler');
const sentJwtToClient = require('../helpers/authorization/sendJwtToClient');
const register = asyncErrorWrapper(async (req, res, next) => {
  const { name, email, password, role } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  sentJwtToClient(user, res);
});

const errorTest = (req, res, next) => {
  return next(new TypeError('Bir Hata Oluştu'));
};

module.exports = {
  register,
  errorTest,
};
