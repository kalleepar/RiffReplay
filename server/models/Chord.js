const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ChordSchema = new Schema({
  ChordText: {
    type: String,
    required: 'You need to leave a Chord!',
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  ChordAuthor: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  comments: [
    {
      commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      commentAuthor: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});

const Chord = model('Chord', ChordSchema);

module.exports = Chord;
