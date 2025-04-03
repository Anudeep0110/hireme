const mongoose = require("mongoose");

const DevUsers = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
});

const DevUser = mongoose.model("devusers", DevUsers);
module.exports = DevUser;