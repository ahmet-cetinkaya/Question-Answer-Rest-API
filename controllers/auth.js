const User = require('../models/User');

const register = async (req, res, next) => {
  // POST DATA
  const name = 'Ahmet Çetinkaya';
  const email = 'ahmetcetinkaya0@outlook.com';
  const password = '12346789';

  // async await

  const user = await User.create({
    name,
    email,
    password,
  });

  res.status(200).json({ success: true, data: user });
};

module.exports = {
  register,
};
