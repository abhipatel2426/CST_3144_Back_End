// Import the Express module
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const { MongoClient, ObjectId } = require('mongodb');


// Import lessons data for initial population
const lessons = require('./public/lessonsData');

// Define author name using Mustache (example)
const mustache = require('mustache');
const result = mustache.render("Hi, {{first}} {{last}}!", {
    first: "Abhi",
    last: "Patel"
});
console.log(result);

// Create an Express app
const app = express();

// Define the port your server will run on
const PORT = process.env.PORT || 3050;

// Middleware for request logging
app.use((req, res, next) => {
    const currentDate = new Date().toISOString();
    console.log(`[${currentDate}] ${req.method} ${req.url}`);
    next();
});

// Middleware for serving static images
app.use('/images', express.static('public/images'));

// Middleware for handling missing image files
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
app.use(express.json());

// MongoDB connection
const uri = "mongodb+srv://pabhi5751:XxwwZGqbzvta2Ut1@lessons.dxdq4.mongodb.net/?retryWrites=true&w=majority&appName=Lessons";
const client = new MongoClient(uri);

// Initial population of lessons in MongoDB
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

// Define a route for the root URL ("/")
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// API Routes

// Get all lessons
app.get('/lessons', async (req, res) => {
    try {
        const db = client.db('MyDatabase');
        const lessons = await db.collection('Lessons').find().toArray();
        res.json(lessons);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch lessons' });
    }
});

// Search lessons
app.get('/search', async (req, res) => {
    const { query } = req.query;
    if (!query) {
        return res.status(400).json({ error: 'Query parameter is required.' });
    }

    try {
        const db = client.db('MyDatabase');
        const collection = db.collection('Lessons');

        const numericQuery = !isNaN(Number(query)) ? Number(query) : null;

        const searchQuery = {
            $or: [
                { subject: { $regex: query, $options: 'i' } },
                { Location: { $regex: query, $options: 'i' } },
                ...(numericQuery !== null
                    ? [
                          { Price: numericQuery },
                          { Space: numericQuery }
                      ]
                    : [])
            ]
        };

        const results = await collection.find(searchQuery).toArray();
        res.json(results);
    } catch (err) {
        console.error('Search error:', err);
        res.status(500).json({ error: 'Search failed.' });
    }
});

// PUT route to update the Space for a specific lesson
app.put('/lessons/:id', async (req, res) => {
    const lessonId = parseInt(req.params.id);
    const { newSpace } = req.body;

    if (isNaN(newSpace) || newSpace < 0) {
        return res.status(400).json({ error: 'Invalid Space value. It must be a non-negative number.' });
    }

    try {
        const db = client.db('MyDatabase');
        const collection = db.collection('Lessons');

        const result = await collection.updateOne(
            { id: lessonId },
            { $set: { Space: newSpace } }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Lesson not found.' });
        }

        res.json({ message: 'Space updated successfully.' });
    } catch (err) {
        console.error('Error updating Space:', err);
        res.status(500).json({ error: 'Failed to update Space.' });
    }
});

// PUT route to update any field(s) of a lesson
app.put('/lessons/update/:id', async (req, res) => {
    const lessonId = parseInt(req.params.id);
    const updates = req.body;

    if (!updates || typeof updates !== 'object' || Object.keys(updates).length === 0) {
        return res.status(400).json({ error: 'No updates provided or invalid format.' });
    }

    try {
        const db = client.db('MyDatabase');
        const collection = db.collection('Lessons');

        const result = await collection.updateOne(
            { id: lessonId },
            { $set: updates }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Lesson not found.' });
        }

        res.json({ message: 'Lesson updated successfully.' });
    } catch (err) {
        console.error('Error updating lesson:', err);
        res.status(500).json({ error: 'Failed to update lesson.' });
    }
});

// Start the server
app.listen(PORT, async () => {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        console.log(`Server is running on http://localhost:${PORT}`);
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
    }
});
// PUT route to update Spaces in the Orders collection
app.put('/lessons/:id', async (req, res) => {
    const lessonId = parseInt(req.params.id);
    const { newSpace } = req.body;

    if (isNaN(newSpace) || newSpace < 0) {
        return res.status(400).json({ error: 'Invalid Space value. It must be a non-negative number.' });
    }

    try {
        const db = client.db('MyDatabase');
        const collection = db.collection('Lessons');

        const result = await collection.updateOne(
            { id: lessonId },
            { $set: { Space: newSpace } }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Lesson not found.' });
        }

        res.json({ message: 'Space updated successfully.' });
    } catch (err) {
        console.error('Error updating Space:', err);
        res.status(500).json({ error: 'Failed to update Space.' });
    }
});

// PUT route to update any field(s) of a lesson
app.put('/orders/:id', async (req, res) => {
    const orderId = req.params.id; // Get the order ID from the URL
    const updates = req.body; // Get updates from the request body

    try {
        const db = client.db('MyDatabase');
        const ordersCollection = db.collection('Orders');

        // Update the order with the given ID
        const result = await ordersCollection.updateOne(
            { _id: new ObjectId(orderId) }, // Correctly use ObjectId here
            { $set: updates } // Apply the updates
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Order not found.' });
        }

        res.json({ message: 'Order updated successfully.', updates });
    } catch (err) {
        console.error('Error updating order:', err);
        res.status(500).json({ error: 'Failed to update order.' });
    }
});
