const mongoose = require('mongoose');

const addProperty = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
})

const add = mongoose.model('add-property-model', addProperty);

module.exports = add;