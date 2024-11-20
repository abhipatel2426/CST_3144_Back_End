// Import the Express module
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const lessons = require('./public/lessonsData');
const { MongoClient } = require('mongodb');

// define author name to package.json using mustache

var mustache = require("mustache");
var result = mustache.render("Hi, {{first}} {{last}}!", {
    first: "Abhi",
    last: "Patel"
});

console.log(result);

// Create an Express app
const app = express();

// Define the port your server will run on
const PORT = process.env.PORT || 3050;

//logger middleware 
app.use((req, res, next) => {
    //timestamp for req when received
    const currentDate = new Date().toISOString();
    //HTTP method, requested url, and timestamp
    console.log(`[${currentDate}] ${req.method} ${req.url}`);
    // Move to the next middleware or route handler
    next();
})

//path for handling image request
app.use('/images', express.static('public/images'));

//middleware to handling missing image files
app.use('/images/:imageName', (req, res, next) => {
    const imagePath = __dirname + '/public/images/' + req.params.imageName;

    fs.access(imagePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.log(`Image not found: ${req.params.imageName}`);
            res.status(404).send('Image not found');
        } else {
            next(); // File exists, pass control to express.static to serve it
        }
    });
});

// Serve static files from the 'public' directory
app.use(express.static('public'));
app.use(cors());

// Define the /lessons route that returns lessons as JSON
app.get('/lessons', (req, res) => {
    res.json(lessons); // Send the lessons array as JSON
});

// Define a route for the root URL ("/")
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

//Mongodb connection

const uri = "mongodb+srv://pabhi5751:XxwwZGqbzvta2Ut1@lessons.dxdq4.mongodb.net/?retryWrites=true&w=majority&appName=Lessons";

const client = new MongoClient(uri);

async function insertLessonsOnce() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db('MyDatabase');
        const collection = db.collection('Lessons');

        // Check if lessons already exist
        const existingLessons = await collection.find().toArray();
        if (existingLessons.length === 0) {
            const result = await collection.insertMany(lessons);
            console.log(`${result.insertedCount} lessons inserted.`);
        } else {
            console.log('Lessons already exist in the database.');
        }
    } catch (err) {
        console.error('Error:', err);
    } 
}

insertLessonsOnce();

app.use(express.json());


// POST route to save a new order
app.post('/order', async (req, res) => {
    try {
        const { name, phone, lessonIDs, spaces } = req.body;

        // Validate incoming data
        if (!name || !phone || !Array.isArray(lessonIDs) || !Array.isArray(spaces)) {
            return res.status(400).json({ error: 'Invalid order data' });
        }

        // Ensure the number of lessonIDs matches the number of spaces
        if (lessonIDs.length !== spaces.length) {
            return res.status(400).json({ error: 'Lesson IDs and spaces must match in length' });
        }

        // Create order object
        const order = {
            name,
            phone,
            lessonIDs,
            spaces
        };

        // Insert the order into the 'orders' collection
        const db = client.db('MyDatabase');
        const result = await db.collection('Orders').insertOne(order);
        res.json({ message: 'Order placed successfully', orderId: result.insertedId });
    } catch (error) {
        console.error('Error saving order:', error);
        res.status(500).json({ error: 'Failed to save order' });
    }
});