const crypto = require('node:crypto');
global.crypto = crypto;
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3002;

app.use(bodyParser.json());

mongoose.connect('mongodb://mongo:27017/users').then(() => console.log('Connected to MongoDB')).catch((err) => console.log("MongoDB connection error: ",err)); 

const TaskSchema = new mongoose.Schema({
    title: String,
    description: String, 
    userId: String, 
    createdAt: {
        type: Date, 
        default: Date.now
    }
});

const Task = mongoose.model('Task', TaskSchema); 



app.post('/tasks', async (req, res) => { 


    const { title,description, userId } = req.body; 
    try{ 
    const task = new Task({ title, description, userId });
    await task.save(); 
    res.status(201).send(task);
    } catch (error) { 
        console.log(error);
        res.status(500).send('Error creating tasks');
    }
}); 

app.get('/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.send(tasks);
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Task Service listening on port ${port}`);
});