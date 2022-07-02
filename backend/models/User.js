const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let userSchema = new Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: '1',
  }
})
module.exports = mongoose.model('User', userSchema)