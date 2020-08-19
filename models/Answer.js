const mongoose = require('mongoose');
const Questions = require('./Questions');
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
  content: {
    type: String,
    required: [true, 'Please provide a content'],
    minlength: [10, 'Please provide a content at least 10 characters'],
  },
  createdAt: { type: Date, default: Date.now },
  likes: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  question: {
    type: mongoose.Schema.ObjectId,
    ref: 'Question',
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
});

AnswerSchema.pre('save', async function (next) {
  if (!this.isModified('user')) return next();
  try {
    const question = await Questions.findById(this.question);
    question.answers.push(this._id);
    await question.save();
    next();
  } catch (err) {
    return next(err);
  }
});

module.exports = mongoose.model('Answer', AnswerSchema);
