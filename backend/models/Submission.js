const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const submissionSchema = new Schema({
    storyTitle: {
        type: String,
        required: true
    },
    storyText: {
        type: String,
        required: true
    }, 
    //submissionType == "customApparel" OR "characterCandidate" 
    submissionType: {
        type: String,
        required: true
    },
    submissionDate: {
        type: Date, 
    },
    //submissionStatus only applies to characterCandidate submissions
    //ex. confirmed, pending, denied 
    submissionStatus:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('submissions', submissionSchema);
