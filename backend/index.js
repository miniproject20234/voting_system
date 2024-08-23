var express = require("express");
const mongoose = require("mongoose")
const authRoutes = require('./routes/authRouters')
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authmiddleware');



//for conect mongodb
const dotenv = require('dotenv');
dotenv.config();

const app = express();

//middleware
app.use(express.json());
app.use(cookieParser());

const uri = process.env.ATLAS_URI;
const port=process.env.PORT || 5000;

mongoose.connect(uri)
  .then(() => {
    console.log('Connected to MongoDB successfully');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });


  app.use(authRoutes);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})

