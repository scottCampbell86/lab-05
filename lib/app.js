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


//update a note by id

//delete a note

module.exports = app;