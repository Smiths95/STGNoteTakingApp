const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Note creator must be present'],
  },
  title: {
    type: String,
    required: [true, 'Note title is required'],
  },
  content: {
    type: String,
    required: [true, 'Please provide note content'],
  },
  tag: {
    type: String,
    default: 'General'
  },
  date: {
    type: String,
    default: Date.now(),
  },
});

const Note = mongoose.model('note', NoteSchema);

module.exports = Note;
