const {Note, validate} = require('../models/notes');
const express = require('express');
const router = express.Router();

// GET
router.get('/', async(req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).send(notes);
  } catch (error) {
    res.status(500).send('An error occurred.The course with the given ID was not found.');
  }
});

router.get('/:id', async(req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note)
      return res.status(404).send('The course with the given ID was not found.');
    
      res.status(200).send(note);
  } catch (error) {
    res.status(500).send('An error occurred.The course with the given ID was not found.');
  }

});

// Post
router.post('/', async(req, res) => {
  try {
    
    const { error } = validate(req.body);
    if (error) res.status(400).send(error.details[0].message);
    
    let note = new Note ({
      text: req.body.text,
      source: req.body.source,
      category: req.body.category,
    });
    
    note = await note.save();
    res.send(note);
  } catch (error) {
    res.status(500).send('An error occurred.');
  }
});

// Delete
router.delete('/:id', async(req, res) => {
  try {
    const note = await Note.findByIdAndRemove(req.params.id);
    if (!note)
      return res.status(404).send('The course with the given ID was not found.');
  
    res.send(note);  
  } catch (error) {
    res.status(500).send('An error occurred.The course with the given ID was not found.');
  }
});

module.exports = router;
