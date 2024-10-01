const express = require('express');
const router = express.Router();
const Sale = require('../models/Sale'); // Make sure the path to your Sale model is correct

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

// Delete a sale by ID
router.delete('/:id', async (req, res) => {
    try {
        const sale = await Sale.findByIdAndDelete(req.params.id);
        if (!sale) {
            return res.status(404).send('Sale not found');
        }
        res.status(200).send('Sale deleted successfully');
    } catch (error) {
        res.status(500).send(error);
    }
});

// Export the router
module.exports = router;
