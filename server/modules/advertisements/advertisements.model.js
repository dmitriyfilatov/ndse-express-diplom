const mongoose = require('mongoose');
const { Schema, SchemaTypes } = mongoose;
const schema = new Schema({
  shortText: {
    type: SchemaTypes.String,
    required: true,
  },
  description: {
    type: SchemaTypes.String,
  },
  images: {
    type: [SchemaTypes.String],
  },
  user: {
    type: SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  tags: {
    type: [SchemaTypes.String],
  },
  isDeleted: {
    type: Boolean,
    required: true,
    default: false,
  },
});
const Advertisement = mongoose.model('Advertisement', schema);
module.exports = { Advertisement };
