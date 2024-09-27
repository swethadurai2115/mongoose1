const express = require('express');
const router = express.Router();
const Sale = require('../models/Sale');

// Get all sales
router.get('/', async (req, res) => {
    try {
        const sales = await Sale.find().populate('sale_items.item');
        res.json(sales);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new sale
router.post('/', async (req, res) => {
    const { sale_items, total_price } = req.body;

    const sale = new Sale({
        sale_items,
        total_price
    });

    try {
        const newSale = await sale.save();
        res.status(201).json(newSale);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
