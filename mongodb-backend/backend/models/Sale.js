const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
    sale_items: [{
        item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
        quantity: { type: Number, required: true }
    }],
    total_price: { type: Number, required: true }
});

module.exports = mongoose.model('Sale', saleSchema);