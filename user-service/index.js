const crypto = require('node:crypto');
global.crypto = crypto;
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3001;

app.use(bodyParser.json());

mongoose.connect('mongodb://mongo:27017/users').then(() => console.log('Connected to MongoDB')).catch((err) => console.log("MongoDB connection error: ",err)); 

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
});

const User = mongoose.model('User', UserSchema); 



app.post('/users', async (req, res) => { 


    const { name, email } = req.body; 
    try{ 
    const user = new User({ name, email });
    await user.save(); 
    res.status(201).send(user);
    } catch (error) { 
        console.log(error);
        res.status(500).send('Error creating user');
    }
}); 

app.get('/users', async (req, res) => {
    const users = await User.find();
    res.send(users);
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`User Service listening on port ${port}`);
});