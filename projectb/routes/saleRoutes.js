// routes/saleRoutes.js
const express = require('express');
const router = express.Router();
const Sale = require('../models/Sale');

// Create a sale
router.post('/', async (req, res) => {
    const sale = new Sale({
        sale_items: req.body.sale_items,  // Array of items with quantity and price
        total: req.body.total
    });
    await sale.save();
    res.status(201).json(sale);
});

// Get all sales with item details
router.get('/', async (req, res) => {
    const sales = await Sale.find().populate('sale_items.item');
    res.json(sales);
});

module.exports = router;
