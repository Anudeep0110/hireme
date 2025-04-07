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
    dob: {
        type: Date,
    },
    gender: {
        type: String,
    },
    linkedIn: {
        type: String,
        default: ''
    },
    jobPreferences: {
        jobType:{
            type: String,
            required: true,
        },
        workAvailability:{
            type: String,
            required: true,
        },
        preferredLocation:{
            type: String,
            required: true,
        },
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
    projects: [{
        projectName: { type: String, required: true },
        description: { type: String, required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
    }],
    certifications: [{
        certificationName: { type: String, required: true },
        issuingOrganization: { type: String, required: true },
        issueDate: { type: Date, required: true },
        expirationDate: { type: Date, required: true },
    }],
    portfolioLink: { type: String, default: '' },
    resumeLink: { type: String, default: '' },
    connections: [{
        seekerId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'seekers'
        },
    }]
});

const Seeker = mongoose.model("seekers", Seekers);
module.exports = Seeker;