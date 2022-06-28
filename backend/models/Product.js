const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    // productImage: {
    //     data: Buffer,
    //     contentType: String,
    // },

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