const mongoose = require('mongoose');

const seekerProfileSchema = new mongoose.Schema({
    seekerId: { type: mongoose.Schema.Types.ObjectId, ref: 'seekers', required: true },
    profilePicture: { type: String, default: '' },
    bio: { type: String, default: '' },
    skills: [{ type: String, default: [] }],
    experience: [{ type: String, default: [] }],
    education: [{ type: String, default: [] }],
    portfolioLink: { type: String, default: '' },
    resumeLink: { type: String, default: '' },
}, { timestamps: true });

const SeekerProfile = mongoose.model('seekerprofiles', seekerProfileSchema);

module.exports = SeekerProfile;