const mongoose = require('mongoose');
const { Schema, SchemaTypes } = mongoose;
const schema = new Schema({
  email: {
    type: SchemaTypes.String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: SchemaTypes.String,
    required: true,
  },
  name: {
    type: SchemaTypes.String,
    required: true,
  },
  contactPhone: {
    type: SchemaTypes.String,
    required: false,
  },
});

const User = mongoose.model('User', schema);
module.exports = { User };