const User = require('../models/User');
const CustomError = require('../helpers/error/CustomError');
const asyncErrorWrapper = require('express-async-handler');

const register = asyncErrorWrapper(async (req, res, next) => {
  // POST DATA
  // const name = 'Ahmet Çetinkaya';
  // const email = 'ahmetcetinkaya0@outlook.com';
  // const password = '1234';

  const { name, email, password, role } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  const token = user.generateJwtFromUser();

  console.log(token);

  res.status(200).json({ success: true, data: user });
});

const errorTest = (req, res, next) => {
  return next(new TypeError('Bir Hata Oluştu'));
};

module.exports = {
  register,
  errorTest,
};
