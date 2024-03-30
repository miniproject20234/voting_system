const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB setup
mongoose.connect('mongodb://localhost:27017/voting_system', { useNewUrlParser: true, useUnifiedTopology: true });
const Vote = mongoose.model('Vote', { option: String });

// Express middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Routes
app.post('/vote', async (req, res) => {
    const { option } = req.body;
    try {
        const newVote = new Vote({ option });
        await newVote.save();
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

// Start server
app.listen(6000, () => {
    console.log(`Server is running on port 6000`);
});
