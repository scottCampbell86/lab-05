const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/app');

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
});