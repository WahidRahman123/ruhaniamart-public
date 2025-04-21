const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        url: {
            type: String,
            required: true
        },
        altText: {
            type: String,
        }
    },
    isPopular: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("Category", categorySchema);