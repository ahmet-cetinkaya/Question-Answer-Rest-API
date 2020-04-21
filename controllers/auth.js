const User = require('../models/User');

const register = async (req, res, next) => {
  // POST DATA
  const name = 'Ahmet Çetinkaya';
  const email = 'ahmetcetinkaya0@outlook.com';
  const password = '1234';

  // async await - try catch
  try {
    const user = await User.create({
      name,
      email,
      password,
    });
  } catch (err) {
    return next(err);
  }

  res.status(200).json({ success: true, data: user });
};

const errorTest = (req, res, next) => {
  throw new Error('Bir Hata Oluştu');
};

module.exports = {
  register,
  errorTest,
};
