const mongoose = require('mongoose');

const aspectSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    language: {
        type: String,
        enum: ['fr', 'ar']
    }

});

const Aspect = mongoose.model('Aspect', aspectSchema);

module.exports = Aspect;
