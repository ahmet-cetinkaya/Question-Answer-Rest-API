const Question = require('../models/Questions');
const CustomError = require('../helpers/error/CustomError');
const asyncErrorWrapper = require('express-async-handler');

const askNewQuestion = asyncErrorWrapper(async (req, res, next) => {
  const information = req.body;
  console.log(`!: askNewQuestion -> information`, information);

  const question = await Question.create({
    ...information,
    user: req.user.id,
  });

  res.status(200).json({ success: true, data: question });
});

const getAllQuestions = async (req, res, next) => {
  return res.status(200).json(res.queryResults);
};

const getSingleQuestion = async (req, res, next) => {
  console.log(`!: getSingleQuestion -> res.queryResults`, res.queryResults);
  return res.status(200).json(res.queryResults);
};

const editQuestion = asyncErrorWrapper(async (req, res, next) => {
  const { id } = req.params;
  const information = req.body;

  const question = await Question.findByIdAndUpdate(id, information, {
    new: true,
    runValidators: true,
  });

  return res.status(200).json({ success: true, data: question });
});

const deleteQuestion = asyncErrorWrapper(async (req, res, next) => {
  const { id } = req.params;

  await Question.findByIdAndDelete(id);

  return res.status(200).json({ success: true, message: 'Question delete operation Successfully' });
});

const likeQuestion = asyncErrorWrapper(async (req, res, next) => {
  const { id } = req.params;
  const question = await Question.findById(id);
  if (question.likes.includes(req.user.id)) {
    return next(new CustomError('You already liked this question', 400));
  }
  question.likes.push(req.user.id);
  question.likeCount = question.likes.length;
  question.save();
  return res.status(200).json({ success: true, data: question });
});

const undoLikeQuestion = asyncErrorWrapper(async (req, res, next) => {
  const { id } = req.params;
  const question = await Question.findById(id);
  if (!question.likes.includes(req.user.id)) {
    return next(new CustomError('You cannot undo like operation for this question.', 400));
  }
  const index = question.likes.indexOf(req.user.id);
  question.likes.splice(index, 1);
  question.likeCount = question.likes.length;
  question.save();
  return res.status(200).json({ success: true, data: question });
});

module.exports = {
  askNewQuestion,
  getAllQuestions,
  getSingleQuestion,
  editQuestion,
  deleteQuestion,
  likeQuestion,
  undoLikeQuestion,
};
