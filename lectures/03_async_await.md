---
title:  'Asynchronous coding - async await'
author:
- Maja Frydrychowicz, Jaya Nilakantan
- 420-520-DW
revealjs-url: revealjs
---

<style>
  ol li {
    list-style-type: lower-alpha
  } 
  .present p, .present li {
    text-align: left;
  }
</style>

## Source

Large parts of this lecture are from *Data Wrangling with JavaScript, Ashley Davis, Manning Publications (2018)*. You can read this and many other great tech books and courses for free at [BAnQ](https://www.banq.qc.ca/accueil/). Get a free library subscription!

The [Dawson library](https://library.dawsoncollege.qc.ca/) also has lots of useful free resources!

## Recall - Promises

A *promise* is an object that wraps an asynchronous operation and promises to resolve to an outcome (or a rejection) at some time in the future.

## then

*then* is used to chain a sequence of async operations that resolve in sequence.

---

Pseudo-code - assume the `readFile`s return Promises:
```js
readFile1()
  .then (result1 => {
    //use the result
    return readFile2(result1);
  })
  .then (result2 => {
    //use the result
    return readFile3(result2);
  })
  .then (result3 => {
    //last callback, use the result
  });
```
## all

*all* is used to manage async operations that can run in parallel, i.e., the results do not depend on each other. 

All Promise operations are started at the same time (in order of the parameter), but may end up resolving at different times.

When all are resolved, they invoke a callback with an ordered array containing all the results - the order matches the parameter, not when each Promise resolved.

---

Pseudo-code assume the `readFileParallel`s return Promises:
```js
Promise.all( [ //an iterable with the async operations
  readFileParallel1(),
  readFileParallel2(),
  readFileParallel3()
  ]) //results is an array, in the order the functions were listed,
   //regardless on the orrder they resolved
  .then (results => { 
    //final callback, use the result
});
```
## catch

A *catch* error handler can be used anywhere in the chain, although we often just have one at the end of the chain.

One error handler can be shared by all the async functions.

---

Pseudo-code:
```js
readFile1()
  .then (result1 => {
    //use the result
  })
  .catch ( error => errorHandler);
```

## Wrapping an operation in a Promise

Recall: a Promise constructor needs a function that takes two callbacks as parameters: what to do when the Promise is resolved and what to do when it is rejected.

---

Pseudo-code:
```js
function myPromiseBasedFunction (param1, param2, etc) {
  return new Promise(
    (resolve, reject) => {  
      call_an_async_operation;
      if (async-operation-fails) 
        reject(error);
      //when async operation completes 
      resolve(optional-result);  
    }
  );  //end return
}
//using it
myPromiseBasedFunction(a) //returns a Promise object
.then(optional-result => doSomething) //resolve callback
.catch(error => handleError); //triggered by the reject callback
```

## Using async

The [async and await](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await) keywords were added in ES2017. They are "syntactic sugar" on top of Promises: meaning that the underlying mechanism is exactly the same, but the code is a bit easier to read.

`async` in front of a function declaration or expression means that it returns a Promise.

---

```js
async function hello() { return "Hello" };
hello();
```

The Promise is immediately resolved to "Hello".
But to actually get the result out of the Promise, we use a `then` block.

```js
async function hello() { return "Hello" };
hello().then(value => console.log(value));
```

## async without return statement
You can code `async` functions that don't return anything explicitly (i.e., no `return` statement). An `async` function **always** returns a Promise even if there is not an explicit return statement, with a resolution of `undefined`.

## await

`await` typically works with async functions. Put it in front of any function that returns a Promise: the code will stop there while waiting for a response. But it is not blocking the main thread! 

The code looks like a sequence of synchronous operations, but it is still asynchronous.

---

The code stops at the `await` expression **in the `async` function only**. The rest of the `async` function is blocked; **but** other code can execute on the main thread. When the Promise resolves, the rest of the `async` function can execute.

## Example

Example of the [control flow]( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function#description).

```js
function resolveAfter2Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, 2000);
  });
}
async function asyncCall() {
  console.log('calling');
  const result = await resolveAfter2Seconds();
  console.log(result);
  // expected output: "resolved"
}
asyncCall();
console.log('after call');
```

## Converting Promise chains to async-await

```js
//Promise chain above rewritten with async await
async function readFiles() {
  let response1 = await readFile1();
  let response2 = await readFile2(result1);
  let response3 = await readFile3(result2);
  //code that uses result3
} //async function always returns a Promise 

readFiles()
.catch( error => console.error(error.message));
```
---

`async` `await` syntax improves readability - the `then` blocks are not needed, and it *looks* like synchronous code.

---

But **beware**! It is **not** synchronous! Within the `async` function, `readFile2` is invoked only after `readFile1`'s Promise is resolved: this is normal, since the Promise needs to fulfil. But `readFile1` does not block other tasks **outside** this `async` function from running: specifically, event messages in the queue can be handled while we `await` the results!

## await with Promise.all
```js
//Promise.all chain above rewritten with async await
async function readAllFiles() {
  let results = await Promise.all([
    readFileParallel1(), 
    readFileParallel2(),
    readFileParallel3()
    ]);
  //use results
}
readAllFiles()
.catch( error => console.error(error.message));
```

## Alternative - try-catch syntax
Instead of using a `catch` callback function, you could also use `try-catch` syntax.

```js
//try-catch block
async function readFiles() {
  let response1, response2, response3;
  try {
    response1 = await readFile1();
    response2 = await readFile2(result1);
    response3 = await readFile3(result2);
    //use results
  } catch(e) {
    console.error(e.message);
  }
}
readFiles();
```

## Recall: Fetch API with Promises

```js
function getJSON(url, useJSON, displayError) {
  fetch(url).
    then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Status code: " + response.status);
      }
    }).
    then(content => useJSON(content)).
    catch(error => displayError(error));
}
```

## Fetch API with async await

```js
async function getJSON(url, useJSON) {
  let response = await fetch(url);
  let content;
  if (response.ok) {
    content = await response.json();
  } else {
    throw new Error("Status code: " + response.status);
  }
  useJSON(content);
}
getJSON(url, displayStuff)
.catch(error => displayError(error));
```
## Quiz

```js
/** Button event handler **/
function buttonClick(e) {
  const url = "https://opentdb.com/api.php?amount=1&category=18";
  getJSON(url, addQuestion)
  .catch(e=> console.error(e.message));
  console.log("getting question");
}
function addQuestion(json) {
  let currentQ = json.results[0];
  //code to add it to the DOM
}
async function getJSON(url, useJSON) {
  let response = await fetch(url);
  //.. code as in previous slide
}
```
Indicate the sequence if no errors. 
