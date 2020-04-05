const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send({
    message: 'Welcome to the Jokes API',
  });
});

app.get('/jokes', (req, res) => {
  res.send({
    message: 'All jokes endpoint',
  });
});

app.get('/joke/random', (req, res) => {
  res.send({
    message: 'Random joke endpoint',
  });
});

app.get('/joke/random/personal/:first/:last', (req, res) => {
  res.send({
    message: 'Personal random joke endpoint',
  });
});

module.exports = app;
