const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

app.use(cors());
app.use(express.json());

const Jobs = require('./Schemas/Jobs'); // Assuming you have a Jobs model defined in models/Jobs.js

// Route to get all jobs
app.get('/jobs', async (req, res) => {
    try {
        const jobs = await Jobs.find({},{_id: 0});
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching jobs', error });
    }
});

// Route to get a job by ID
app.get('/jobs/:id', async (req, res) => {
    try {
        const job = await Jobs.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.status(200).json(job);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching job', error });
    }
});


// Route to create a new job
app.post('/jobs', async (req, res) => {
    try {
        const newJob = new Jobs(req.body);
        const savedJob = await newJob.save();
        res.status(201).json(savedJob);
    } catch (error) {
        res.status(500).json({ message: 'Error creating job', error });
    }
});

// Route to delete a job by ID
app.delete('/jobs/:id', async (req, res) => {
    try {
        const deletedJob = await Jobs.findByIdAndDelete(req.params.id);
        if (!deletedJob) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.status(200).json({ message: 'Job deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting job', error });
    }
});

module.exports = app;
