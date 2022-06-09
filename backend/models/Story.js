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
    },
    //storyStatus only applies to characterCandidate submissions
    //ex. confirmed, pending, denied 
    storyStatus:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('stories', storySchema);
