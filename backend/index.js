const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require('./routes/authRouters');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { requireAuth } = require('./middleware/authmiddleware');

require('dotenv').config(); 

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true, 
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

// Protect the `/votepage` route with `requireAuth`
app.get('/votepage', requireAuth, (req, res) => {
  res.json({ message: "Welcome to the voting page!" });
});

app.use(authRoutes);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
