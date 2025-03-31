/* eslint-disable no-unused-vars */
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// configuring nodemailer
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GOOGLE_EMAIL,
        pass: process.env.GOOGLE_APP_PWD
    }
});

// OTP Bucket
const otpBucket = {};

const app = express();

//mongodb connection
const db = require('./connexion.js');

//importing mongodb schemas
const seekers = require('./Schemas/Seekers.js')




app.use(cors());
app.use(express.json());

app.post('/send-code', (req, res) => {
    const email = req.body.email;
    seekers.find({email:email})
    .then((result) => {
        if(result.length > 0){
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            // Store the OTP in the database or in-memory store for later verification
            otpBucket[email] = otp;
            console.log(otpBucket);
            const mailOptions = {
                from: process.env.GOOGLE_EMAIL,
                to: email,
                subject: 'OTP for Email Verification',
                text: `Your OTP is ${otp} for email verification. Do not share it with anyone.`
            };
        
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                    res.status(500).send({ message: 'Error in sending OTP', data: {} });
                } else {
                    console.log('Email sent: ' + info.response);
                    res.status(200).send({ message: 'OTP sent successfully', data: { otp } });
                }
            });
        }else{
            res.status(404).send({message:"User Not Found",data:{}})
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).send({message:"Error in checking user",data:{}})
    })
})

app.post('/verify-otp', (req, res) => {
    const otp = req.body.otp;
    if (!otp) {
        return res.status(400).send({ message: 'OTP is required', data: {} });
    }
    if (otpBucket[req.body.email] === otp) {
        delete otpBucket[req.body.email]; // Clear the OTP after verification
        res.status(200).send({ message: 'OTP verified successfully', data: {} });
    }
    else {
        res.status(400).send({ message: 'Invalid OTP', data: {} });
    }
})


app.get('/getseekers',(req,res) => {
    seekers.find()
    .then((result) => {
        if(result.length === 0){
            res.status(404).send({message:"No Seekers Found",data:{}})
        }
        console.log(result);
        res.status(200).send({message:"Seekers Found",data:result})
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send({message:"Error in fetching seekers",data:{}})
    })
})

app.post('/signup/seeker',(req,res) => {
    const data = req.body;
    seekers.find({email:data.email})
    .then((result) => {
        if(result.length > 0){
            res.status(400).send({message:"User Already Exists",data:{}})
        }else{
            console.log(data);
            const newSeeker = new seekers(data);
            newSeeker.save()
            .then(() => {
                res.status(201).send({message:"User Created",data:data})
            })
            .catch((err) => {
                console.log(err);
                res.status(500).send({message:"Error in creating user",data:{}})
            })
        }
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send({message:"Error in checking user",data:{}})
    })
})


app.listen(5000,() => {
    console.log("Server started on port 5000")
})