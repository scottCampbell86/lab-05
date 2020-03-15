const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title: {
        type: String, 
        required: true
    },
    body: {
        type: String, 
        required: true
    },
    category: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Note', schema);
