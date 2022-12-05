const router = require('express').Router();
let Notes = require('../models/note.model');

router.route('/').get((req,res) => {
    Notes.find()
         .then(notes => res.json(notes))
         .catch(error => res.status(400).json(`Error: ${error}`));
});

router.route('/add').post((req,res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);
    
    const newNote = new Notes({
        username,
        description,
        duration,
        date
    });

    newNote.save()
            .then(() => res.json('Note added'))
            .catch(error => res.status(400).json(`Error: ${error}`));
});

router.route('/:id').get((req, res) => {
    Notes.findById(req.params.id)
         .then(notes => res.json(notes))
         .catch(error => res.status(400).json(`Error: ${error}`));
});

router.route('/:id').delete((req, res) => {
    Notes.findByIdAndDelete(req.params.id)
         .then(() => res.json('Note deleted'))
         .catch(error => res.status(400).json(`Error: ${error}`));
});

router.route('/update/:id').post((req, res) => {
    Notes.findById(req.params.id)
         .then(notes => {
                notes.username = req.body.username;
                notes.description = req.body.description;
                notes.duration = Number(req.body.duration);
                notes.date = Date.parse(req.body.date);

                notes.save()
                     .then(() => res.json('Note updated'))
                     .catch(error => res.status(400).json(`Error: ${error}`));
            }
         )
         .catch(error => res.status(400).json(`Error: ${error}`));
});




module.exports = router;