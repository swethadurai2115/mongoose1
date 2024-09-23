const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('./models/User');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/aggregation_example', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Aggregation route
app.get('/api/users/stats', async (req, res) => {
  try {
    const pipeline = [
      {
        $match: { age: { $gte: 18 } }, // Filter adults
      },
      {
        $group: {
          _id: '$country',
          averageAge: { $avg: '$age' },
          totalPurchases: { $sum: { $size: '$purchases' } },
        },
      },
      { $sort: { totalPurchases: -1 } },
    ];

    const result = await User.aggregate(pipeline);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Aggregation failed' });
  }
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});
