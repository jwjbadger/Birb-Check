const express = require('express');
const mongoose = require('mongoose');
const monConf = require('./mongoose.conf.json');
var sanitize = require('mongo-sanitize');

const dotenv = require('dotenv');

// Start app with JSON parser
const app = express();
app.use(express.json());

// Use .env
dotenv.config();

// Sanatize data and allow headers, methods, and origins
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT,PATCH');
  res.set(
    'Access-Control-Allow-Headers',
    'Content-Type, Access-Control-Allow-Methods, Access-Control-Allow-Headers, auth-token',
  );
  req.body = sanitize(req.body);
  next();
});

// External Routes
const postsRoute = require('./routes/posts');
app.use('/posts', postsRoute);

const usersRoute = require('./routes/users');
app.use('/users', usersRoute);

// Routes
app.get('/', (req, res) => {
  res.json({ err: 'Incorrect path' });
});

// Connect to database
mongoose.connect('mongodb://localhost:27017/birb', monConf, () => {
  console.log('Got database with options:');
  console.log(monConf);
});

// Listen
app.listen(4000);
