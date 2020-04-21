const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: [true, 'Please provide a name'] },
  email: {
    type: String,
    required: true,
    unique: [true, 'Please try different email'],
    match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Please provide a valid email'],
  }, // https://stackoverflow.com/questions/18022365/mongoose-validate-email-syntax
  role: { type: String, default: 'user', enum: ['user', 'admin'] }, // enum: belirli verilerden olabileceğini belirtiriz.
  password: {
    type: String,
    minlength: 6,
    required: [true, 'Please provide a valid email'],
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  title: {
    type: String,
  },
  about: {
    type: String,
  },
  place: {
    type: String,
  },
  website: {
    type: String,
  },
  profile_image: {
    type: String,
    default: 'default.jpg',
  },
  blocked: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('User', UserSchema);
