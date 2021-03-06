
// packages
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const environment = require('./environment');
const postsRoutes = require('./routes/blogs');
const authRoutes = require('./routes/auth');

const app = express();




var port = process.env.PORT || 8080;

app.use(bodyParser.json());

// for cors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

// calling routes
app.use('/blogs', postsRoutes);
app.use('/auth', authRoutes);

// for handling errors
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});


//Mongoose connection and server start
mongoose
  .connect(
    environment.MongoUrl
  )
  .then(result => {
    app.listen(port);
    console.log('server started');
  })
  .catch(err => console.log(err));
