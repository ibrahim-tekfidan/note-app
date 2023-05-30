const morgan = require('morgan');
const helmet = require('helmet');
const notes = require('./routes/notes');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

mongoose
  .connect('mongodb+srv://ibrahimtekfidan:1234@cluster0.b3c5cwb.mongodb.net/')
  .then(() => console.log('Connected to mongoDB'))
  .catch(err => console.error('Could not connect to mongoDB..', err));



// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
// process.env.NODE_ENV -> export NODE_ENV
if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  console.log('Morgan enabled.');
}

// routes
app.use('/api/notes', notes);


const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
