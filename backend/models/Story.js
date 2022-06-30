const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storySchema = new Schema({
    storyTitle: {
        type: String,
        required: true
    },
    storyText: {
        type: String,
        required: true
    },
    //storyType == "customApparel" OR "characterCandidate"
    storyType: {
        type: String,
        required: true
    },
    storyDate: {
        type: Date,
        default: Date.now()
    },
    storyStatus:{
        type: String,
        required: true,
        default: 'new'
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
});

module.exports = mongoose.model('stories', storySchema);
