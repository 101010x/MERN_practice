//Declaration of express app
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

//Routes import
const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');



mongoose.connect('',{useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
      console.log('Succesfully connected to MongoDB Atlas');
    })
    .catch((error) => {
      console.log('Unable to connect to MongoDB Atlas');
      console.error(error);
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

app.use('/images',express.static(path.join(__dirname, 'images')));

app.use('/api/stuff',stuffRoutes);
app.use('/api/auth', userRoutes);


module.exports = app;
