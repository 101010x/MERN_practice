//An Express app is basically a series of functions called middleware. Each piece of middleware receives the request and response objects, and can read, parse, and manipulate them as necessary.
//MongoDB pass: pgXhEdxE4FXNnteY
//MongoDB Connection: mongodb+srv://mutugi:<password>@cluster0-gsja1.mongodb.net/test?retryWrites=true&w=majority


//Declaration of express app
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

//Routes import
const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');



mongoose.connect('mongodb+srv://mutugi:pgXhEdxE4FXNnteY@cluster0-gsja1.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true})
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