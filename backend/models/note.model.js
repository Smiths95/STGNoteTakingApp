
const mongoose = require('mongoose');

const noteSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    user_id: {
      type: String,
      required: true
    },
    reminderTime: {
      type: Number
    }
  },
  {
    timestamps: true
  }
)
const Note = mongoose.model('Note',noteSchema);
module.exports = Note