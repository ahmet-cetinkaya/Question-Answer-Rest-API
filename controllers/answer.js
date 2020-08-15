const Questions = require('../models/Questions');
const Answer = require('../models/Answer');
const CustomError = require('../helpers/error/CustomError');
const asyncErrorWrapper = require('express-async-handler');

const addNewAnswerToQuestion = asyncErrorWrapper(async (req, res, next) => {
  const { question_id } = req.params;
  const user_id = req.user.id;
  const information = req.body;
  const answer = await Answer.create({
    ...information,
    question: question_id,
    user: user_id,
  });
  return res.status(200).json({ success: true, data: answer });
});

const getAllAnswerByQuestion = asyncErrorWrapper(async (req, res, next) => {
  const { question_id } = req.params;
  const question = await Questions.findById(question_id).populate('answers');
  const answers = question.answers;
  return res.status(200).json({ success: true, count: answers.length, data: answers });
});

const getSingleAnswer = asyncErrorWrapper(async (req, res, next) => {
  const { answer_id } = req.params;
  const answer = await Answer.findById(answer_id)
    .populate({
      path: 'question',
      select: 'title',
    })
    .populate({ path: 'user', select: 'name profile_image' });
  return res.status(200).json({ success: true, data: answer });
});

const editAnswer = asyncErrorWrapper(async (req, res, next) => {
  const { answer_id } = req.params;
  const { content } = req.body;
  let answer = await Answer.findById(answer_id);
  answer.content = content;
  await answer.save();
  return res.status(200).json({ success: true, data: answer });
});

module.exports = { addNewAnswerToQuestion, getAllAnswerByQuestion, getSingleAnswer, editAnswer };
