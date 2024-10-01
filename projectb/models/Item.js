// models/Item.js
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }  // Reference to Category
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
