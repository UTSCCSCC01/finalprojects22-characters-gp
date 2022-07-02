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
        type: Number,
        required: true
    },
    
    productDescription: {
        type: String,
        required: true
    },

    productInventoryAmount: {
        type: Number,
        required: true
    },

    productStory: {
        body: String,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'stories'
    },

});

module.exports = mongoose.model('products', productSchema);