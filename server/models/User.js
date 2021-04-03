const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: false,
  },
  contactPhone: {
    type: String,
    required: false,
    unique: false,
  },
});

module.exports = model('User', userSchema);
