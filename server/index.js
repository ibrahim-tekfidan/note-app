const morgan = require('morgan');
const helmet = require('helmet');
const notes = require('./routes/notes');
const express = require('express');
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
// process.env.NODE_ENV -> export NODE_ENV
if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  console.log('Morgan enabled.');
}

// routes
app.use('/api/notes', notes);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
