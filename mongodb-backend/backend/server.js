require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection string
const mongoURI = 'mongodb://localhost:27017/salesdb'; // Ensure this is correct

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Models
const Category = require('./models/Category');
const Item = require('./models/Item');
const Sale = require('./models/Sale');
const categoryRoutes = require('./routes/categoryRoutes');
// Routes
app.use('/categories', categoryRoutes);
app.use('/categories', require('./routes/categoryRoutes'));
app.use('/items', require('./routes/ItemRoutes'));
app.use('/sales', require('./routes/saleRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
