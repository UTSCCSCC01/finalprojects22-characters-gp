const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let userSchema = new Schema({
  email: {
    type: String
  },
  password: {
    type: String
  },
  isEmployer: {
    type: Boolean,
    default: false
  }
})
module.exports = mongoose.model('User', userSchema)