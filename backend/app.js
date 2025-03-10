const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');

dotenv.config();

const bookRoutes = require('./routes/books');
const userRoutes = require('./routes/user');
const path = require('path');

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json()); // It allows to analyze the body of requests in JSON format

/* To avoid CORS errors, we add headers to the response to allow the front-end to access the API. */
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/api/books', bookRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;