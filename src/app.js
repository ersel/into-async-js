const express = require('express');
// eslint-disable-next-line
const request = require('request');
const axios = require('axios');

const app = express();

app.get('/', (req, res) => {
  res.send({
    message: 'Welcome to the Jokes API',
  });
});

app.get('/jokes', (req, res) => {
  request('https://api.icndb.com/jokes', (error, response) => {
    if (error) {
      // eslint-disable-next-line
      console.log(error);
    }

    const parsedBody = JSON.parse(response.body);

    res.send({ jokes: parsedBody.value });
  });
});

app.get('/joke/random', (req, res) => {
  axios
    .get('https://api.icndb.com/jokes/random?exclude=[excplicit]')
    .then(response => {
      res.send({ randomJoke: response.data.value });
    })
    .catch(error => {
      // eslint-disable-next-line
      console.log(error);
    });
});

app.get('/joke/random/personal/:first/:last', async (req, res) => {
  const { first, last } = req.params;

  try {
    const response = await axios.get(
      `http://api.icndb.com/jokes/random?firstName=${first}&lastName=${last}&exclude=[excplicit]`,
    );

    res.send({ personalJoke: response.data.value });
  } catch (error) {
    // eslint-disable-next-line
    console.log(error);
  }
});

module.exports = app;
