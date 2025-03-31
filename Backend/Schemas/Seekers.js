const mongoose = require("mongoose");

const Seekers = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    }
});

const Seeker = mongoose.model("seekers", Seekers);
module.exports = Seeker;