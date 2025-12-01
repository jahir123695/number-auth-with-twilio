require('dotenv').config(); 

const express = require('express');
const app = express();

// Load DB
require('./src/config/db');

// Load Routes
const authRoutes = require('./src/routes/authRoutes');

// Middleware to parse JSON
app.use(express.json());

// Default route
app.get("/", (req, res) => {
    res.send("Phone Auth API Running Successfully");
});

// AUTH Routes
app.use("/auth", authRoutes);

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
