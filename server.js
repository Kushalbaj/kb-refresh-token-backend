require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());  // For parsing application/json

// // Connect to DB
// mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('Connected to MongoDB!'))
//   .catch(err => console.error('Could not connect to MongoDB...', err));


// Connect to DB
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB!');
  } catch (err) {
    console.error('Could not connect to MongoDB...', err);
  }
}

connectDB();

// Import Routes
const authRoute = require('./routes/auth');  // assuming you have auth.js file in routes directory
const todoRoute = require('./routes/todos'); // assuming you have todos.js file in routes directory

// Route Middlewares
app.use('/api/user', authRoute);
app.use('/api/todos', todoRoute);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
