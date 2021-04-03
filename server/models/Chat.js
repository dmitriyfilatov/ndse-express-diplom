const { Schema, model } = require('mongoose');

const chatSchema = new Schema({
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  ],
  createdAt: {
    type: Date,
    required: true,
  },
  messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
});

module.exports = model('Chat', chatSchema);
