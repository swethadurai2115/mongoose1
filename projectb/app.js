// app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Import routes
const categoryRoutes = require('./routes/categoryRoutes');
const itemRoutes = require('./routes/itemRoutes');
const saleRoutes = require('./routes/saleRoutes');

// Create an Express app
const app = express();

// Middleware
app.use(cors());  // Enable CORS for cross-origin requests
app.use(bodyParser.json());  // Parse incoming JSON requests

// Routes
app.use('/api/categories', categoryRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/sales', saleRoutes);

// Error handling middleware (optional)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

module.exports = app;
