const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/authenticateUser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');


// Get all notes using GET - at /api/notes/getuser
router.get("/fetchallnotes", authenticateUser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch(error) {
    console.error(error.message);
    res.status(500).send('Internal server error');
  }
});


// Add a new note using POST - at /api/notes/addnote
router.post('/addnote', authenticateUser, [
  body('title', 'Enter a valid title').isLength({ min: 2 }),
  body('content', 'Body of note must be at least 5 characters long').isLength({ min: 5 })
], async (req, res) => {
  try {
    const { title, content, tag } = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const note = new Note({
      title,
      content,
      tag,
      user: req.user.id
    })
    const savedNote = await note.save();
    res.json(savedNote);
  } catch(error) {
    console.error(error.message);
    res.status(500).send('Internal server error');
  }
});


// Edit an existing note using PUT - at /api/notes/updatenote
router.put("/updatenote/:id", authenticateUser, async (req, res) => {
  const { title, content, tag } = req.body;
  try {
    const newNote = {};
    if(title) { newNote.title = title }
    if(content) { newNote.content = content }
    if(tag) { newNote.tag = tag }

    // Find note to be updated and edit it
    let note = await Note.findById(req.params.id);
    if(!note) {
      return res.status(404).send('Not found');
    }

    if(note.user.toString() !== req.user.id) {
      return res.status(401).send('Not allowed');
    }

    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
    res.json({ note });
  } catch(error) {
    console.error(error.message);
    res.status(500).send('Internal server error');
  }
});


// Delete an existing note using DELETE - at /api/notes/deletenote
router.delete('/deletenote/:id', authenticateUser, async (req, res) => {
  try {
    let note = await Note.findById(req.params.id);
    if(!note) {
      return res.status(404).send('Not found')
    }
    if(note.user.toString() !== req.user.id) {
      return res.status(401).send('Not allowed');
    }
    note = await Note.findByIdAndDelete(req.params.id);
    res.json({
      'Success': 'Note has been deleted',
      note: note
    });
  } catch(error) {
    console.error(error.message);
    res.status(500).send('Internal server error')
  }
});


module.exports = router;
