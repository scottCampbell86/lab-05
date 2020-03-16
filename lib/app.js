const express = require('express');
const app = express();
const Note = require('../models/Notes.js');

app.use(express.json());

//routes

//create a note
app.post('/api/v1/notes', (req, res, next) => {
    Note
        .create(req.body)
        .then(note => res.send(note))
        .catch(next);
});

//read a note by id
app.get('/api/v1/notes/:noteId', (req, res, next) => {
    Note 
        .findById(req.params.noteId)
        .then(note => res.send(note))
        .catch(next);
});

//read all notes
app.get('/api/v1/notes', (req, res, next) => {
    Note
        .find()
        .then(notes => res.send(notes))
        .catch(next);
});

//read a note by category
app.get('/api/v1/notes/category/:categoryId', (req, res, next) => {
    Note
        .find({ category: req.params.categoryIdentifier })
        .then(notes => res.send(notes))
        .catch(next);
});


//update a note by id
app.patch('/api/v1/notes/:noteId', (req, res, next) => {
    Note
        .findByIdAndUpdate(req.params.noteId, req.body, { new: true })
        .then(note => res.send(note))
        .catch(next);
});

//delete a note
app.delete('api/v1/notes/:noteId', (req, res, next) => {
    Note
        .findByIdAndDelete(req.params.noteId)
        .then(note => res.send(note))
        .catch(next);
});


module.exports = app;
