const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  country: String,
  purchases: [
    {
      item: String,
      price: Number,
      date: Date,
    },
  ],
});

module.exports = mongoose.model('User', userSchema);
