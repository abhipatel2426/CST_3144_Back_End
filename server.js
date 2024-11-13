// Import the Express module
const express = require('express');
const fs = require('fs');

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
const PORT = process.env.PORT || 3000;

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

// Define a route for the root URL ("/")
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
