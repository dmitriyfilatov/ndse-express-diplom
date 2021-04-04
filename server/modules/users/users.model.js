const mongoose = require('mongoose');
const { Schema, SchemaTypes } = mongoose;
// const passportLocalMongoose = require('passport-local-mongoose');

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
// schema.plugin(passportLocalMongoose);
const User = mongoose.model('User', schema);
module.exports = { User };
