const supertest = require('supertest');
const app = require('../src/app');

it('GET / should respond with Hello world!', done => {
  supertest(app)
    .get('/')
    .then(res => {
      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toEqual('Welcome to the Jokes API');
      done();
    });
});

it('GET /jokes should respond with the correct response value', done => {
  supertest(app)
    .get('/jokes')
    .then(res => {
      expect(res.statusCode).toEqual(200);
      expect(res.body.jokes).toEqual('All jokes endpoint');
      done();
    });
});

it('GET /joke/random should respond with the correct response value', done => {
  supertest(app)
    .get('/joke/random')
    .then(res => {
      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toEqual('Random joke endpoint');
      done();
    });
});

it('GET /joke/random/personal/:first/:last should respond with the correct response value', done => {
  supertest(app)
    .get('/joke/random/personal/manchester/codes')
    .then(res => {
      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toEqual('Personal random joke endpoint');
      done();
    });
});
