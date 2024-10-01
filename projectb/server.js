// server.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

// Load environment variables from .env file
dotenv.config();

// Use environment variables or default values
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/inventory-system';

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        // Start the server after successfully connecting to MongoDB
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);  // Exit the application if there's an error
    });
