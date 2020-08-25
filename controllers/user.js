const User = require('../models/User');
const CustomError = require('../helpers/error/CustomError');
const asyncErrorWrapper = require('express-async-handler');

const getSingleUser = asyncErrorWrapper(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  return res.status(200).json({ success: true, data: user });
});

const getAllUser = asyncErrorWrapper(async (req, res, next) => {
  return res.status(200).json(res.queryResults);
});

module.exports = { getSingleUser, getAllUser };
