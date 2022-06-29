const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let userSchema = new Schema({
  email: {
    type: String
  },
  password: {
    type: String
  },
  type: {
    type: String,
    default: '1'
  }
  //1 = normal user, 2 = character, 3 = employee
})
module.exports = mongoose.model('User', userSchema)