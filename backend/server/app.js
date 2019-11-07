const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const { NODE_ENV } = process.env;

// Connect db
(async () => {
    const DB_PARAMS = { useNewUrlParser: true, useUnifiedTopology: true };
    const MONGO_URI = NODE_ENV === 'test'
        ? 'mongodb://localhost/recipeTEST'
        : 'mongodb://localhost/recipe';

    await mongoose.connect(MONGO_URI, DB_PARAMS);
    console.info('DB connected');
})();

// Initialize application
const app = express();



// Middlewares
if (!NODE_ENV === 'test') app.use(morgan('dev'));
app.use(bodyParser.json());

// Routes

module.exports = app;