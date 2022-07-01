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
    },

    productInventoryAmount: {
        type: String,
        required: true
    },

    ////////////////////// for testing purposes only
    productStory: {
        body: String,
        type: mongoose.Schema.Types.ObjectId
    },
    //////////////////////

});

module.exports = mongoose.model('products', productSchema);