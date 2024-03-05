const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    language: {
        type: String,
        enum: ['fr', 'ar']
    }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
