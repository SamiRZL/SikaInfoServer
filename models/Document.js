const mongoose = require('mongoose');

const documentSchema = mongoose.Schema({
    aspect: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Aspect',
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    pdf: {
        type: String,
        //unique: true
    },
    title: {
        type: String,
        unique: true
    },
    language: {
        type: String,
        enum: ['fr', 'ar']
    }
});

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;
