const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recieptSchema = new Schema({

// this is just to note the "schema" of what checkout needs to pass to send reciept

    orderNumber: {
        // order number is the order ID
        type: Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },

    orderTotal: {
        //total spent
        type: Number,
        required: true
    },

   
    address: {
        type: String, 
        required: true
    },


    user: {
        userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
        name: {type: String, required: true},
        email: {type: String, required: true}
    }
});

module.exports = mongoose.model('reciepts', recieptSchema);