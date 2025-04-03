const mongoose = require('mongoose');

const ConnectionRequestsSchema = new mongoose.Schema({
    senderId: {
        type: String,
        required: true,
    },
    receiverId: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending',
    },
    message: {
        type: String,
        default: '',
    },
}, { timestamps: true });

const ConnectionRequests = mongoose.model('connectionrequests', ConnectionRequestsSchema);

module.exports = ConnectionRequests;