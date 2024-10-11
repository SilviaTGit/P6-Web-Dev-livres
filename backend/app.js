const express = require('express');
const mongoose = require('mongoose');
const app = express();

const bookRoutes = require('./routes/books');

mongoose.connect('mongodb+srv://alice:2ZDbbHzlcBR0yitU@cluster0.ssawd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//app.use(express.json()); ??

/* To avoid CORS errors, we add headers to the response to allow the front-end to access the API. */
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/api/books', bookRoutes);

module.exports = app;