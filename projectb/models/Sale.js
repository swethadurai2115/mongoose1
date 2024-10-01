// models/Sale.js
const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
    sale_items: [{
        item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },  // Reference to Item
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }  // Price at the time of sale
    }],
    total: { type: Number, required: true },
    saleDate: { type: Date, default: Date.now }
});

const Sale = mongoose.model('Sale', saleSchema);

module.exports = Sale;
