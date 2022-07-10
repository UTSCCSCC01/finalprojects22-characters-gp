const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    transactionDate: {
        type: Date,
        required: true
    },

    purchasedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    shippingInfo: {
        firstName: {type: String, required: true}, 
        lastName: {type: String, required: true},
        address: {type: String, required: true}
    },

    billingInfo: {
        firstName: {type: String, required: true}, 
        lastName: {type: String, required: true},
        address: {type: String, required: true},
        paymentMethod: {type: String, required: true}
    },

    products: [{
        pid: {type: Schema.Types.ObjectId, ref: 'products', required: true},
        itemCount: {type: Number, required: true}
    }]
});

module.exports = mongoose.model('orders', orderSchema);