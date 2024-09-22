const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require('./routes/authRouters');
const cors = require('cors');

const path = require('path');
const cookieParser = require('cookie-parser');

require('dotenv').config(); 

const app = express();

app.use(cors({
  origin: 'https://votevibe.vercel.app/', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'], 
}));

app.use(express.json());
app.use(cookieParser());

const uri = process.env.ATLAS_URI;
const port = process.env.PORT || 5000;

mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Apply middleware
// app.use(checkUser);

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(authRoutes);
// Serve images from the "backend/images" directory


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});