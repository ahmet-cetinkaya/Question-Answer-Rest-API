const CustomError = require('../../helpers/error/CustomError');
const jwt = require('jsonwebtoken');
const asyncErrorWrapper = require('express-async-handler');
const User = require('../../models/User');
const {
  isTokenIncluded,
  getAccessTokenFromHeader,
} = require('../../helpers/authorization/tokenHelpers');
const Question = require('../../models/Questions');

const getAccessToRoute = (req, res, next) => {
  if (!isTokenIncluded(req)) {
    return next(new CustomError('You are not authorization to access this route', 401));
  }

  const accessToken = getAccessTokenFromHeader(req);
  const { JWT_SECRET_KEY } = process.env;

  jwt.verify(accessToken, JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return next(new CustomError('You are not authorization to access this route', 401));
    }
    req.user = {
      id: decoded.id,
      name: decoded.name,
    };
    next();
  });
};

const getAdminAccess = asyncErrorWrapper(async (req, res, next) => {
  const { id } = req.user;
  const user = await User.findById(id);
  if (user.role !== 'admin') {
    return next(new CustomError('Only admins can access this route', 403));
  }
  next();
});

const getQuestionOwnerAccess = asyncErrorWrapper(async (req, res, next) => {
  const userId = req.user.id;
  const questionId = req.params.id;
  const question = await Question.findById(questionId);
  console.log(
    `!: getQuestionOwnerAccess -> question.user !== userId`,
    userId,
    question.user,
    question.user != userId
  );
  if (question.user != userId) {
    return next(new CustomError('Only owner can handle this operation', 403));
  }
  next();
});

module.exports = { getAccessToRoute, getAdminAccess, getQuestionOwnerAccess };
