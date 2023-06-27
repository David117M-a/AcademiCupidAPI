const mongoose = require('mongoose');

const MatchSchema = new mongoose.Schema({
    personOne: {
        type: String,
        required: true
    },
    matchedPersonOne: {
        type: Boolean,
        required: true
    },
    personTwo: {
        type: String,
        required: true
    },
    matchedPersonTwo: {
        type: Boolean
    }
});

const Match = mongoose.model('Match', MatchSchema);

module.exports = Match;