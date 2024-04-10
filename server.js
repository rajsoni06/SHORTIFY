const express = require('express');
const mongoose = require('mongoose');
const app = express();

const PORT = process.env.PORT || 3030;

mongoose.connect('mongodb://localhost:27017/urlshorts')

const db = mongoose.connection;

db.on('error', () => {
    console.log('Error connecting to MongoDB');
});
db.once('open', () => {
    console.log("Connected to MongoDB");
});

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Link router
const urlRouter = require('./routes/urlRoute');
app.use('/', urlRouter);

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});
