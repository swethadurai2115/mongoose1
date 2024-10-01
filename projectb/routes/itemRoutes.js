// routes/itemRoutes.js
const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// Create an item
router.post('/', async (req, res) => {
    const item = new Item({
        name: req.body.name,
        price: req.body.price,
        category: req.body.category  // Expecting category ID
    });
    await item.save();
    res.status(201).json(item);
});

// Get all items with their category details
router.get('/', async (req, res) => {
    const items = await Item.find().populate('category');
    res.json(items);
});

module.exports = router;
