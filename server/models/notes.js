const Joi = require('joi');
const mongoose = require('mongoose');

// Creating model => Class 
const Note = mongoose.model('Note',new mongoose.Schema({
  text: {
    type: String,
    maxlength:200,
    required: true
  },
  source: {
    type: String,
    validate: {
      validator: function(value) {
        // Regular expression to validate URL
        const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
        return urlRegex.test(value);
      },
      message: 'Invalid URL format',
    },
  },
  category: {
    type: String,
    enum: [
      'technology',
      'science',
      'finance',
      'society',
      'entertainment',
      'health',
      'history',
      'news'
    ],
    required: true
  },
})
);



function validate(obj) {
  const schema = Joi.object({
    text: Joi.string().max(200).required(),
    source: Joi.string().uri(),
    category: Joi.string().required(),
  });

  return schema.validate(obj);
}

exports.Note = Note;
exports.validate = validate;