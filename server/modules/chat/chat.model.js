const mongoose = require('mongoose');
const { Schema, SchemaTypes } = mongoose;
const schema = new Schema({
  users: [
    {
      type: SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    {
      type: SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
  ],
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  messages: [{ type: SchemaTypes.ObjectId, ref: 'Message' }],
});
const Chat = mongoose.model('Chat', schema);
module.exports = { Chat };
