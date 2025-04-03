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
    },
    profilePicture: { 
        type: String, 
        default: '' 
    },
    bio: { 
        type: String, 
        default: '' 
    },
    skills: [{
        skillName: { type: String, required: true },
        skillLevel: { type: String, required: true,min:1,max:5}, 
    }],
    experience: [{
        companyName: { type: String, required: true },
        jobTitle: { type: String, required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
        description: { type: String, required: true },
        location: { type: String, required: true }
    }],
    education: [{
        institutionName: { type: String, required: true },
        degree: { type: String, required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
        location: { type: String, required: true }
    }],
    portfolioLink: { type: String, default: '' },
    resumeLink: { type: String, default: '' },
});

const Seeker = mongoose.model("seekers", Seekers);
module.exports = Seeker;