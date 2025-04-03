const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const app = express();
app.use(cors());
app.use(express.json());

// Schemas 

const devs = require('./Schemas/DevUsers.js');


app.post('/addDevUser',(req, res) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10); // Hash the password
    const newUser = new devs({ username, password: hashedPassword });
    
    newUser.save()
        .then(() => res.status(201).json({ message: 'User created successfully' }))
        .catch(err => res.status(500).json({ error: err.message }));
})

app.get('/getDevUsers', (req, res) => {
    console.log(req.headers.authorization);
    devs.find()
        .then(users => res.status(200).json(users))
        .catch(err => res.status(500).json({ error: err.message }));
})



module.exports = app;