const User = require('../models/User');
const CustomError = require('../helpers/error/CustomError');
const asyncErrorWrapper = require('express-async-handler');
const { sendJwtToClient } = require('../helpers/authorization/tokenHelpers');
const { validateUserInput, comparePassword } = require('../helpers/input/inputHelpers');
const sendEmail = require('../helpers/libraries/sendEmail');

const register = asyncErrorWrapper(async (req, res, next) => {
  const { name, email, password, role } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  sendJwtToClient(user, res);
});

const login = asyncErrorWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  if (!validateUserInput(email, password)) {
    return next(new CustomError('Please check your inputs'), 400);
  }

  const user = await User.findOne({ email }).select('+password');

  if (!comparePassword(password, user.password)) {
    return next(new CustomError('Please check your credentials', 400));
  }
  sendJwtToClient(user, res);
});

const logout = asyncErrorWrapper(async (req, res, next) => {
  const { NODE_ENV } = process.env;
  return res
    .status(200)
    .cookie({
      httpOnly: true,
      expires: new Date(Date.now()),
      secure: NODE_ENV === 'development' ? false : true,
    })
    .json({ success: true, message: 'Logout Successfully' });
});

const getUser = (req, res, next) => {
  res.json({
    success: true,
    data: {
      id: req.user.id,
      name: req.user.name,
    },
  });
};

// Forgot Password
const forgotpassword = asyncErrorWrapper(async (req, res, next) => {
  const resetEmail = req.body.email;
  const user = await User.findOne({ email: resetEmail });
  if (!user) {
    return next(new CustomError('There is no user with this email', 400));
  }

  const resetPasswordToken = user.getResetPasswordTokenFromUser();

  await user.save();

  const resetPasswordUrl = `http://localhost:5000/api/auth/resetpassword?resetPasswordToken=${resetPasswordToken}`;

  const emailTemplate = `
<h3>Reset Your Password</h3>
<p> This <a href="${resetPasswordUrl}" target="_blank">link</a> will expire in 1 hour`;

  try {
    await sendEmail({
      from: process.env.STMP_USER,
      to: resetEmail,
      subject: 'Reset Your Password',
      html: emailTemplate,
    });
    res.status(200).json({ success: true, message: 'Token Sent To Your Email.' });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    return next(new CustomError('Email could not be sent.'), 500);
  }
});

const resetPassword = asyncErrorWrapper(async (req, res, next) => {
  const { resetPasswordToken } = req.query;
  const { password } = req.body;

  if (!resetPassword) {
    return next(new CustomError('Please provide a valid token', 400));
  }

  let user = await User.findOne({
    resetPasswordToken: resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(new CustomError('Invalid Token or Session Expired', 404));
  }

  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  return res.status(200).json({ success: true, message: 'Reset Password Process Successfully' });
});

module.exports = { register, getUser, login, logout, forgotpassword, resetPassword };
