require('dotenv').config();
const request = require('supertest');
const app = require('../app');
const connection = require('../config/connection');

describe('Test routes', () => {
  it('GET / sends "Hello World" as json', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((response) => {
        const expected = { message: 'Hello World!' };
        expect(response.body).toEqual(expected);
        done();
      });
  });
});

describe('Test book routes post', () => {
  beforeEach((done) => connection.query('TRUNCATE bookmark', done));
  it('POST /bookmarks - ERROR (fields no provided)', (done) => {
    request(app)
      .post('/bookmarks')
      .send({})
      .expect(422)
      .expect('Content-Type', /json/)
      .then((response) => {
        const expected = { error: 'required field(s) missing' };

        expect(response.body).toEqual(expected);
        done();
      });
  });

  it('POST /bookmarks - OK (fields provided)', (done) => {
    request(app)
      .post('/bookmarks')
      .send({ url: 'https://jestjs.io', title: 'Jest' })
      .expect(201)
      .expect('Content-Type', /json/)
      .then((response) => {
        const expected = {
          id: expect.any(Number),
          url: 'https://jestjs.io',
          title: 'Jest',
        };

        expect(response.body).toEqual(expected);
        done();
      });
  });
});

describe('Test book routes get', () => {
  const testBookmark = { url: 'https://nodejs.org/', title: 'Node.js' };
  beforeEach((done) =>
    connection.query('TRUNCATE bookmark', () =>
      connection.query('INSERT INTO bookmark SET ?', testBookmark, done)
    )
  );

  it('GET /bookmarks/:id - OK one book found', (done) => {
    request(app)
      .get('/bookmarks/0')
      .expect(404)
      .expect('Content-Type', /json/)
      .then((response) => {
        const expected = { error: 'Bookmark not found' };

        expect(response.body).toEqual(expected);
        done();
      });
  });

  it('GET /bookmarks/:id - ERROR no book found', (done) => {
    request(app)
      .get('/bookmarks/1')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((response) => {
        const expected = {
          id: 1,
          url: 'https://nodejs.org/',
          title: 'Node.js',
        };

        expect(response.body).toEqual(expected);
        done();
      });
  });

  afterAll((done) => connection.end(done));
});
