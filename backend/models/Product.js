const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    productImage: {
        type: String,
        required: true
    },

    productName: {
        type: String,
        required: true
    }, 

    productPrice: {
        type: String,
        required: true
    },
    
    productDescription: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('products', productSchema);