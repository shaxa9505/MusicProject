const mongoose = require("mongoose");

const Schema = mongoose.Schema

const MusicSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    singer: {
        type: String,
        required: true
    },
    comments: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("music", MusicSchema)