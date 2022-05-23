const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let itemSchema = new Schema({
  name: {
    type: String
  },
  quantity: {
    type: Number
  },
  deleted: {
    type: Boolean,
    default: false
  },
  deleteMessage: {
    type: String,
    default: ''
  }
}, {
    collection: 'items'
  })
module.exports = mongoose.model('Item', itemSchema)