# Intro to Asynchronous Javascript

## Introduction

Javascript is a single-threaded programming language which means only one thing can happen at a time. That is, the JavaScript engine can only process one statement at a time in a single thread.

While being single-threaded simplifies writing code because we don’t have to worry about concurrency issues, it also means we cannot perform long operations such as network access without blocking the main thread.

Imagine requesting some data from an API, like we've done in the previous track. Depending upon the situation the server might take some time to process the request while blocking the main thread making the web page unresponsive.

That’s where asynchronous JavaScript comes into play. Using asynchronous JavaScript, such as `callbacks`, `promises`, and `async/await`, you can perform long network requests without blocking our main thread of execution.

The three patterns above can be used _almost_ interchangeably, and experience and developer preference will have a huge influence in which to be and in which circumstances.

- [🎬The Evolution of Async JavaScript: From Callbacks, to Promises, to Async/Await - 45 mins](https://www.youtube.com/watch?v=gB-OmN1egV8)

- [📓Callbacks on MDN](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function)

- [📓Promises on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

- [📓Async/Await on MDN](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await)

## Task

The task this week is to create a Node express server, which will run two tasks for us:

1. Make network calls to an external API
2. Serve data fetched from the external resource over 3 REST endpoints:

- `/jokes` - serves all jokes
- `/joke/random` - serves one random joke
- `/joke/random/personal/:first/:last` - serves on random joke with a personalised name

3. All endpoints should accept:

- a query `?explicit=true` that will allow explicit jokes to be returned

4. The `random` endpoints should accept:

- a query `?save=true` that will allow the joke to be saved to you computer file system

For each of these endpoints we will use one of the 3 different ways we have for handling Javascript asynchronicity: `callbacks`, `promises` and `async/js`.

## Tech Stack

- [Node Express](https://expressjs.com)
- [The Internet Chuck Norris Database](http://www.icndb.com/api/)
- [Node File System](https://node.readthedocs.io/en/latest/api/fs/)
- [Postman](https://www.postman.com/)
- [Jest](https://jestjs.io/)
- [SuperTest](https://github.com/visionmedia/supertest)
- [request](https://www.npmjs.com/package/request)
- [Axios](https://www.npmjs.com/package/axios)

## Architecture diagram

Before we crack on let’s try and make a diagram of how our application is going to look like:

DIAGRAM HERE

---

## Step 1 - Setup

Fork, clone, install and run the [Manchester Codes Express Bootstrap](https://github.com/MCRcodes/express-bootstrap)

- 💡The repo README contains the necessary information to perform the above task
- ❌Don't move forward with the track without first checking if the server is running correctly (instructions in the repo)

- ✅have two spaces open in your terminal, one where you can keep your server running, another where you can interact with the files and code

  SCREENSHOT HERE

## Step 2 - Create endpoints

Create our three endpoints, using:

- [`app.get()`](https://expressjs.com/en/5x/api.html#app.get.method)
- [`res.send()`](https://expressjs.com/en/5x/api.html#res.send)

📝`index.js` is where the express server is being run, `app.js` inside the `/src` directory is where our routes are going to be homed

💡Look at the "hello world" route and controller and use it as an example to send an appropriate message as a response for each route, eg:

    {message: "This is the all jokes endpoint",}

## Step 3 - Check and tidy up

On postman or in your browser check that you can access both endpoints and that the messages displayed match the ones you set in your server

✅ You can change the message in the controller of the root route to something more meaningful than "Hello World", eg, "Welcome to the Jokes API" or similar.
✅ Don't forget to commit and push your work.

## Step 4 - Test your code

As with our previous track, we will be using `end-to-end` testing for our API endpoints, and for this we will use [SuperTest](https://github.com/visionmedia/supertest)

1. Head to the `__tests__` folder and check the `hello-world.test.js` file.

2. ❓Can you describe line by line what this code is doing? ❓

- ❗️Notice how `request` is a method given to us by `supertest` and this is what we will use to interact with `app` (line 1 and 5)
- ❗️Notice how after `"requesting the app" - line 5`, which we could probably describe as being similar to opening postman:
  - we are going to `"interact"` with the root route `/` by making a `get` request to it. This `.get()` method matches the one we used when creating the route
  - with the `.then()` method we start to assert what we expect upon "hitting" or interacting with that route. In this case it is twofold: that a 200 success code is returned plus a message that states "Hello World".
- notice that we're passing a `done` callback on line 4 and that we're invoking it when all the asynchronous operations have been completed, on line 10. More on this [here](https://jestjs.io/docs/en/asynchronous).

3. ❓Without running the tests what would you say it'll happen - this test will pass or fail? ❓

4. ✅Run the test in your terminal. Did you guess correctly? Why is it behaving as it is? Have a look at the `Expected` vs `Received` lines in your terminal.

5. ✅Change your test so that your test pass.

- Don't forget to change the description of your test too, as "GET / should respond with Hello world!" is no longer relevant.
- Also change the file name from `hello-world.test.js` to `app.test.js` as we will use this file to test all our endpoints

6. Write other three tests so that the three endpoints you created are tested

- 💡Get into the habit of seeing your tests fail first, and fix them afterwards
- 💡If your test fail with `Expected: 200, Received: 404` have a look at routes - either what you're testing how it's defined in `app.js`

## Step 5 - External API call using `request` and callbacks

Our API is up and running, we have 4 endpoints that are pretty `dumb` so it is time for us to make our first call to the external Joke API and fetch some data. For that we will be using [`request`](https://www.npmjs.com/package/request), a library which is installed by default when we do `npm install` and it's located in the `node_modules` directory of your project.

This means we won't need to install it specifically (as in `npm i --save request`) and can use it directly by require it on the top of our `app.js` by doing

```
const request = require('request');
```

And we are going to update our `/jokes` controller so it looks like:

```
 [1]    app.get('/jokes', (req, res) => {
 [2]      request('https://api.icndb.com/jokes', (error, response) => {
 [3]          if (error) {
 [3]             console.log(error);
 [3]          }
 [4]          const parsedResponse = JSON.parse(response.body);

 [5]          res.send({ jokes: parsedResponse.value) });
 [2]      });
 [1]   });
```

So what is happening here?

- [1] the `app.get()` function continues to start and end in the same place
- [2] we have introduced a new function in our controller called `request`. This function takes:

  1. a URL as a string as a first parameter,
  2. a callback function as a second parameter

  - notice how the callback function has two parameters, `error` first and `response` second. These are called error-first callbacks and are common in the node.js ecosystem.

- [3] we handle our `error` first, in this case in very basic way, by logging it. More on error handling at a later stage.
  - ❗️any `console.log()` in your code will be displayed in the terminal session that is running your express server.
- [4] We parse the `response.body` as this is the object that contains all the the data we need, which is sent as sringified JSON by the jokes API. Read more [`JSON.parse(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)`]() and [JSON.stringify](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)
- [5] We move our response method inside the `request` callback function so that we can have access to the `response` and `parsedBody` objects that we want to send
  - `response` is a very large object, feel free to log it to the console to check all the data it contains
  - We are sending a key-value pair of `{jokes: ...}` and the value of `parsedBody.value`

❗️Do not confuse request function we're using here with the one we use in our tests which is powered by _supertest_.

❗️Notice that your controller is also a callback, but in this case a callback with two other parameters (`req` and `res`), so we have a callback inside a callback. Both functions have parameters with very similar names: `res` and `response`. Have a look at what might cause a [callback hell](http://callbackhell.com/).

❗️we use `request` here as a way of exemplifying a callback based library but, as you may have noticed, this library has been deprecated and we do not recommend its use.

✅ disable the es-lint rules that are highlighting the require of `request` and the logging of the error by pasting the following code the line above `// eslint-disable-next-line`

## Step 6 - External API call using `axios` and promises

First we need to install [axios](https://github.com/axios/axios) by writing `npm install axios` on your terminal.

Go ahead and require axios into `app.js`

And we are going to update our `/joke/random` controller so it looks like:

```
[1]          app.get('/joke/random', (req, res) => {
[2]            axios
[3]              .get('https://api.icndb.com/jokes/random?exclude=[excplicit]')
[4]              .then(response => {
                    res.send({ randomJoke: response.data.value });
[4]              })
[5]              .catch(error => {
                    console.log(error);
[5]              });
[1]          });
```

So what can we see here?

- [1] the `app.get()` function continues to start and end in the same place
- [2] we have introduced a new function in our controller called `axios`
- [3] we use the `.get()` method from `axios` which returns a promise. A Javascript promise will have only two states: either is resolved or rejected.
- [4] if the promise is resolved (success) we use the `.then()` method to handle the external API response.
- [5] if the promise is rejected (an error occurs) we can handle it on `.catch()`

❗️Notice that there's no need to parse any values, as the axios library does this automatically for us

❗️A promise cannot be in a rejected and resolved state simultaneously, if it errors it does not run any of the chained `.then()`, if it succeeds the `.catch()` will not have anything to catch.

✅ More on promises in this [blog post](https://zellwk.com/blog/js-promises/)
✅[Fun Fun Function: Promises](https://www.youtube.com/watch?v=2d7s3spWAzo)

## Step 7 - External API call using `axios` and async/await

As `axios` is already installed we will just need to update our `/joke/random/personal/:first/:last` with:

```
[1]          app.get('/joke/random/personal/:first/:last', async (req, res) => {
[2]            const { first, last } = req.params;

[3]            try {
[4]              const response = await axios.get(
                  `http://api.icndb.com/jokes/random?firstName=${first}&lastName=${last}&exclude=[excplicit]`);

[5]               res.send({ personalJoke: response.data.value });
[3][6]          } catch (error) {
                  console.log(error);
[6]            }
[1]          });
```

- [1] The `app.get()` function continues to start and end in the same place, however the controller callback now includes a `async` keyword. [MDN async](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- [2] We're deconstructing the two parameters in our route `:first` and `:last`
- [3] We are using a try..catch block to make sure if there's an error it'll be caught. [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch) [More try/catch](https://javascript.info/try-catch)
- [4] We declare a constant with the name `response` that will capture the value of running `.get()` in `axios`. Notice the `await` keyword. This means that the `async` function execution will be paused until there's a value returned, value which we are "awaiting". [MDN await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await)
- [6] The `catch(e){}` block works similarly to the `.catch(e)` expression on a Promise

✅Async/await is a relatively new way to write asynchronous code. Previous alternatives for asynchronous code are callbacks and promises.  
✅Async/await is actually just [syntactic sugar](https://en.wikipedia.org/wiki/Syntactic_sugar) built on top of promises.  
✅Async/await makes asynchronous code look and behave a little more like synchronous code.

✅[Async/Await in 5 minutes](https://codeburst.io/async-await-in-5-minutes-4081284ffed7)
