const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const express = require('express');
const app = express();
const { getInitialNotes, getCategories } = require('./FakeNoteServices');

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
// process.env.NODE_ENV
if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  console.log('Morgan enabled.');
}

const notes = getInitialNotes();
const categories = getCategories();

// notes data CRUD
// GET
app.get('/api/notes', (req, res) => {
  res.status(200).send(notes);
});

app.get('/api/notes/:id', (req, res) => {
  const note = notes.find(n => n.id === parseInt(req.params.id));

  if (!note)
    return res.status(404).send('The course with the given ID was not found.');
  res.status(200).send(note);
});

// Post
app.post('/api/notes', (req, res) => {
  const { error } = validate(req.body);
  if (error) res.status(400).send(error.details[0].message);

  const note = {
    id: notes.length + 1,
    text: req.body.text,
    source: req.body.source,
    category: req.body.category,
  };

  notes.push(note);
  res.send(note);
});

// Delete
app.delete('/api/notes/:id', (req, res) => {
  const note = notes.find(n => n.id === parseInt(req.params.id));
  if (!note)
    return res.status(404).send('The course with the given ID was not found.');

  const index = notes.indexOf(note);
  notes.splice(index, 1);
  res.send(note);
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server is running on port ${port}`));

function validate(obj) {
  const schema = Joi.object({
    text: Joi.string().max(200).required(),
    source: Joi.string().uri(),
    category: Joi.string().required(),
  });

  return schema.validate(obj);
}
