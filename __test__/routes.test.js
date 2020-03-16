const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/app');
const Note = require('../models/Notes.js');

describe('note routes', () => {
    beforeAll(() => {
        return mongoose.connect('mongodb://localhost:27017/testing');
    });
    
    beforeEach(() => {
        return mongoose.connection.dropDatabase();
    });

    afterAll(() => {
      // eslint-disable-next-line indent
      return mongoose.connection.close();
    });

    it('create a new note with a POST', () => {
        return request(app)
            .post('/api/v1/notes')
            .send({
                title: 'First Note',
                body: 'This test works',
                category: 'animal'
            })
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    title: 'First Note',
                    body: 'This test works',
                    category: 'animal',
                    __v: 0
                });
            });
    });

    it('gets a new note with a GET', () => {
        return Note.create({
            title: 'My Note',
            body: 'My cool note',
            category: 'animal'
        })
            .then(note => {
                return request(app)
                    .get(`/api/v1/notes/${note.id}`);
            }) 
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    title: 'My Note',
                    body: 'My cool note',
                    category: 'animal',
                    __v: 0
                });
            });
    });
    
    it ('gets all notes via GET', () => {
        const notes = [
            { title: 'Note 1', body: 'Note 1', category: 'animal' },
            { title: 'Note 2', body: 'Note 2', category: 'animal' },
            { title: 'Note 3', body: 'Note 3', category: 'animal' }
        ];
        return Note.create(notes)
            .then(() => {
                return request(app)
                    .get(`/api/v1/notes`);
            })
            .then(res => {
                notes.forEach(note => {
                    expect(res.body).toContainEqual({ ...note,
                         _id: expect.any(String),
                         __v:0
                    });
            });
        });
    });
});