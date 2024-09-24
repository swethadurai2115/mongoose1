const express = require('express');
const Item = require('../models/Item');

const router = express.Router();

// Create a new item
router.post('/', async (req, res) => {
    const newItem = new Item(req.body);
    try {
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all items
router.get('/', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Aggregation endpoint
router.get('/aggregate', async (req, res) => {
    try {
        const result = await Item.aggregate([
            { $group: { _id: '$category', totalSales: { $sum: '$price' }, itemCount: { $sum: 1 } } },
            { $sort: { totalSales: -1 } },
        ]);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
