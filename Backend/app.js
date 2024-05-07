const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const config = require('./config/db');
const mongoose = require('mongoose');



mongoose.connect(config.url, config.options)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => console.error('Failed to connect to MongoDB:', err));

app.use(express.json());
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 27017;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
