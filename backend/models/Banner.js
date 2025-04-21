const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
    image: {
        url: {
            type: String,
            required: true
        },
        altText: {
            type: String,
        }
    }
})

module.exports = mongoose.model("Banner", bannerSchema);