const Joi = require('joi');
const express = require('express');
const router = express.Router();
const { getInitialNotes } = require('../FakeNoteServices');

// Getting data
const notes = getInitialNotes();

// notes data CRUD
// GET
router.get('/', (req, res) => {
  res.status(200).send(notes);
});

router.get('/:id', (req, res) => {
  const note = notes.find(n => n.id === parseInt(req.params.id));

  if (!note)
    return res.status(404).send('The course with the given ID was not found.');
  res.status(200).send(note);
});

// Post
router.post('/', (req, res) => {
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
router.delete('/:id', (req, res) => {
  const note = notes.find(n => n.id === parseInt(req.params.id));
  if (!note)
    return res.status(404).send('The course with the given ID was not found.');

  const index = notes.indexOf(note);
  notes.splice(index, 1);
  res.send(note);
});

function validate(obj) {
  const schema = Joi.object({
    text: Joi.string().max(200).required(),
    source: Joi.string().uri(),
    category: Joi.string().required(),
  });

  return schema.validate(obj);
}

module.exports = router;
