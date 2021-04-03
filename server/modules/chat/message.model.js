const mongoose = require('mongoose');
const { Schema, SchemaTypes } = mongoose;
const schema = new Schema({
  author: {
    type: SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
  },
  sentAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  text: {
    type: SchemaTypes.String,
    required: true,
  },
  readAt: {
    type: Date,
    required: false,
  },
});
const Message = mongoose.model('Message', schema);
module.exports = { Message };
