// Import the Express module
const express = require('express');

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
