const express = require('express');
const auth = require('./middleware/auth.js');

// Note model:
const Note = require('./models/note.js');

const router = new express.Router();

// Create a note:
router.post('/notes/create', auth, async (req, res) => {
  const note = new Note({
    ...req.body,
    owner: req.user._id,
  });
  try {
    await note.save();
    res.status(201).send({
      note,
      message: 'Note saved!',
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get all notes:
router.get('/notes/get', auth, async (req, res) => {
  try {
    await req.user.populate('notes');
    res.status(200).send(req.user.notes);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get note by id:
router.get('/notes/:id', auth, async (req, res) => {
  try {
    const note = await Note.findById({
      _id: req.params.id,
    });
    if (!note) {
      return res.status(404).send();
    }
    res.send(note);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete a note:
router.delete('/notes/:id', auth, async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
    });
    if (!note) {
      return res.status(404).send();
    }
    res.send({
      message: 'Note was deleted!',
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
