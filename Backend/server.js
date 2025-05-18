/* eslint-disable no-unused-vars */
const express = require('express');
const cors = require('cors');
const basicAuth = require('express-basic-auth');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const devserver = require('./devs.js');
const s3DBConnect = require('./s3DBConnect.js');
const jobs = require('/jobs.js')


//Basic Auth Middleware
const myAuthMiddleware = async (username, password, cb) => {
    try {
        if(username === 'admin' && password === 'anudeepgude765') return cb(null, true); // Admin access
      // Check if the user exists in the database 
      const user = await devs.findOne({ username });
      
      if (!user) return cb(null, false); // User not found
      const isMatch = await bcrypt.compare(password, user.password);
  
      return cb(null, isMatch); // Return true if password matches
    } catch (error) {
        return cb(null, false); // Authentication failed
    }
};

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

app.use(cors());
app.use(express.json());

app.use(basicAuth({
    authorizeAsync: true,
    authorizer: myAuthMiddleware,
    challenge: true,
    unauthorizedResponse: 'Unauthorized'
}));

// servers
app.use('/', devserver);
app.use('/',jobs);
app.use('/s3', s3DBConnect);

//mongodb connection
require('./connexion.js');

//importing mongodb schemas
const seekers = require('./Schemas/Seekers.js')
const devs = require('./Schemas/DevUsers.js')
const sendConnectionRequest = require('./Schemas/ConnectionRequests.js')

// Route to Fetch the Schema of API Routes
app.get('/getSchema/:apiname', (req, res) => {

    // Function to get schema definition
    const getSchemaDefinition = (schemaPaths) => {
        const schemaDefinition = {};
      
        Object.keys(schemaPaths).forEach((key) => {
          const schemaType = schemaPaths[key];
      
          if (schemaType.instance === "Array" && schemaType.caster) {
            // Handle array type and extract sub-schema
            schemaDefinition[key] = {
              type: "Array",
              items: getSchemaDefinition(schemaType.schema.paths), // Recursively extract sub-schema
            };
          } else {
            schemaDefinition[key] = schemaType.instance;
          }
        });
      
        return schemaDefinition;
    };

    const apiname = req.params.apiname;
    try {
        // Dynamically get the model if it exists
        const Model = mongoose.models[apiname];
    
        if (!Model) {
            return res.status(404).json({ error: "Model not found" });
        }

        // Get Schema Definition
        const schemaDefinition = getSchemaDefinition(Model.schema.paths);
    
        res.json({ collection: apiname, schema: schemaDefinition });
      } catch (error) {
        res.status(500).json({ error: "Error retrieving schema", details: error.message });
      }
})


// Route to Send OTP to Email
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

// Route to Verify OTP
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

// Route to Fetch All Seekers
app.get('/getseekers',(req,res) => {
    seekers.find({},{__v:0})
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

// Route to Fetch Seekers by Email
app.post('/getseeker',(req,res) => {
    const email = req.body.email;
    seekers.find({email:email},{__v:0})
    .then((result) => {
        if(result.length === 0){
            res.status(404).send({message:"Seeker Not Found",data:{}})
        }else{
            res.status(200).send({message:"Seeker Found",data:result})
        }
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send({message:"Error in fetching seeker",data:{}})
    })
})

//Route to Fetch Seeker by ID
app.get('/getseeker/:id',(req,res) => {
    seekers.findById(req.params.id,{__v:0})
    .then((result) => {
        if(!result){
            res.status(404).send({message:"Seeker Not Found",data:{}})
        }else{
            res.status(200).send({message:"Seeker Found",data:result})
        }
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send({message:"Error in fetching seeker",data:{}})
    })
})

//Route to Signup as Seeker
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

// Route to Update Seeker
app.put('/update/seeker/:id',(req,res) => {
    const data = req.body;
    seekers.findByIdAndUpdate(req.params.id,data,{new:true})
    .then((result) => {
        if(!result){
            res.status(404).send({message:"Seeker Not Found",data:{}})
        }else{
            res.status(200).send({message:"Seeker Updated",data:result})
        }
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send({message:"Error in updating seeker",data:{}})
    })
})

// Route to Send Connection Request
app.post('/sendConnectionRequest',(req,res) => {
    const sender = req.body.sender;
    const receiver = req.body.receiver;
    const message = req.body.message || "";
    const newRequest = new sendConnectionRequest({
        senderId: sender,
        receiverId: receiver,
        message: message,
        status: 'pending'
    })
    newRequest.save()
    .then((result) => {
        res.status(201).send({message:"Connection Request Sent",data:result})
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send({message:"Error in sending connection request",data:{}})
    })
})

app.get('/getConnectionRequests',( (req,res) => {
    sendConnectionRequest.find({})
    .then((result) => {
        if(result.length === 0){
            res.status(404).send({message:"No Connection Requests Found",data:{}})
        }else{
            res.status(200).send({message:"Connection Requests Found",data:result})
        }
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send({message:"Error in fetching connection requests",data:{}})
    })
}))

// Route to Fetch Connection Requests
app.get('/getConnectionRequests/:id',(req,res) => {
    sendConnectionRequest.find({receiverId:req.params.id})
    .then((result) => {
        if(result.length === 0){
            res.status(404).send({message:"No Connection Requests Found",data:{}})
        }else{
            res.status(200).send({message:"Connection Requests Found",data:result})
        }
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send({message:"Error in fetching connection requests",data:{}})
    })
})

// Route to Accept Connection Request
app.put('/acceptConnectionRequest/:id',(req,res) => {
    sendConnectionRequest.findByIdAndUpdate(req.params.id,{status:'accepted'},{new:true})
    .then((result) => {
        if(!result){
            res.status(404).send({message:"Connection Request Not Found",data:{}})
        }else{
            // Add the sender and receiver to each other's connections
            const senderId = result.senderId;
            const receiverId = result.receiverId;
            seekers.findByIdAndUpdate(senderId, {$addToSet: {connections: {seekerId:receiverId}}}, {new: true})
            .then(() => {
                seekers.findByIdAndUpdate(receiverId, {$addToSet: {connections: {seekerId:senderId}}}, {new: true})
                .then(() => {
                    console.log("Connection Added");
                })
                .catch((err) => {
                    console.log(err);
                    res.status(500).send({message:"Error in adding connection",data:{}})
                })
            })
            res.status(200).send({message:"Connection Request Accepted",data:result})
        }
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send({message:"Error in accepting connection request",data:{}})
    })
})

// Route to Reject Connection Request
app.put('/rejectConnectionRequest/:id',(req,res) => {
    sendConnectionRequest.findByIdAndUpdate(req.params.id,{status:'rejected'},{new:true})
    .then((result) => {
        if(!result){
            res.status(404).send({message:"Connection Request Not Found",data:{}})
        }else{
            res.status(200).send({message:"Connection Request Rejected",data:result})
        }
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send({message:"Error in rejecting connection request",data:{}})
    })
})

// Route to Delete Connection Request
app.delete('/deleteConnectionRequest/:id',(req,res) => {
    sendConnectionRequest.findByIdAndDelete(req.params.id)
    .then((result) => {
        if(!result){
            res.status(404).send({message:"Connection Request Not Found",data:{}})
        }else{
            res.status(200).send({message:"Connection Request Deleted",data:result})
        }
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send({message:"Error in deleting connection request",data:{}})
    })
})

//Route to Unconnect Connections
app.put('/unconnect',(req,res) => {
    const connectionId = req.body.connectionId;
    const seekerId = req.body.seekerId;
    seekers.findByIdAndUpdate(seekerId,{$pull:{connections:{seekerId:connectionId}}},{new:true})
    .then((result) => {
        if(!result){
            res.status(404).send({message:"Seeker Not Found",data:{}})
        }else{
            res.status(200).send({message:"Connection Removed",data:result})
        }
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send({message:"Error in removing connection",data:{}})
    })
})



// Enabling Server to run on port 5000
app.listen(5000,() => {
    console.log("Server started on port 5000")
})