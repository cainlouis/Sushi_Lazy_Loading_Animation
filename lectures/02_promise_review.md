---
title:  'Review: Async JS (Promises, callbacks)'
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

## JavaScript is Single-Threaded (Mostly)

By default, code runs sequentially on the __main thread__.

## Off The Main Thread

Some _Web API_ features, like _WebWorkers_, provide a way to run JS code on a 
different thread

## Web API

<section><!-- begin vertical slides -->


### What is it? 

Objects and functions provided in the __browser__ environment:
Map, HTMLElement, Promise, Fetch...

It's _standardized_ so that different browsers can implement the same features
independently.

---

### <!-- Web API -->Can we use the Web API in Node.js? 

::: notes

No. The Web API is only supported in a browser environment.

:::

---

### <!-- Web API -->Interoperability

The Web API aims to be __interoperable__: a common platform that _should_ work 
the same regardless of browser choice, OS choice, device choice, etc.

This requires collaboration (and innovation) from many different parties like
Google, Samsung, Mozilla, Apple, Microsoft and more.

---

### <!-- Web API -->Innovation

Cross-company collaboration often leads to better designs, security, privacy.

Independent implementations (Chrome, Firefox, Safari, others) lead to technical 
innovations as each team has different goals and priorities.

::: notes

Different browser vendors (Mozilla, Google, Apple, Microsoft, Brave, etc) have
different business models (non-profit, selling web advertising, selling hardware, 
selling other software, ad blocking), which causes them to prioritize different goals.

They also have different release cycles, expertise, resources (team size, budget) 
so they don't work on the same features at the same pace. As an example, 
they may have different resources for Desktop development versus mobile 
development, or they may prioritize certain operating systems over others.

:::

---

### <!-- Web API -->User Choice, Accessibility

Standardized Web API means it's easier for new browsers/devices to be built 
from the ground up and provide full access to all of the web. __Innovation!__

This also means that users (ideally) have _access_ to all of the web regardless
of their system configuration.

---

### <!-- Web API -->Web Developer Perspective

By using Web API features that are available on as many different browsers
and devices as possible, we maximize the audience of our application.

This can be challenging, because the newest Web API features aren't supported
as quickly on all browsers (e.g. Safari on iOS)

::: notes

Or we might be working on a large, older codebase where it's a relatively low
priority to update to modern Web API features (e.g. integrated HTML form validation
which offers a better use experience).

:::

</section>

---

## Blocking Code

Most of our JS code executes on the main thread, including processing user events.

This means that if we do something slow (large computation, request to a server)
_synchronously_ the user won't be able to interact with the web app until that
task is done. 😥

See `examples/02_blockingSyncMDN.html`.

::: notes

See also <https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Introducing#synchronous_javascript>

:::

## Review: What is a callback?

Example: `showSquare` is a callback.

```js
document.addEventListener("click", showSquare);
```

A function that is scheduled to be called later (e.g. when some event occurs).

## Callbacks with async code

Sometimes, the function that schedules the callback starts executing async code
(like making an HTTP request) in the background.

---

Example: `loadAsset` schedules `f` to run when HTTP request is 
done loading.

```js
function loadAsset(url, type, f) {
  // old way to make HTTP requests
  let xhr = new XMLHttpRequest();
  // set up the request
  xhr.open('GET', url);
  xhr.responseType = type;

  // schedule the callback 
  xhr.onload = function() {
    // f is called when we see 
    // the request's "load" event.
    f(xhr.response);
  };

  // send the request (browser does off the main thread)
  xhr.send();
}
```

::: notes

Using callbacks likes this is an older style of writing async code in JS. You
will certainly see it out in the wild (at work, etc.)

Older codebases use `XMLHTTPRequest` with callbacks to make
HTTP requests. The HTTP request is performed asynchronously.

See <https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest>

(⚠ This just a conceptual example; we won't be using `XMLHTTPRequest` in this course.)

:::

---

## Calling `loadAsset`

Here `displayImage` is used as a callback by `loadAsset`.

```js
function displayImage(blob) {
  let objectURL = URL.createObjectURL(blob);

  let image = document.createElement('img');
  image.src = objectURL;
  document.body.appendChild(image);
}

loadAsset('coffee.jpg', 'blob', displayImage);
```

::: notes

When the background code finishes running it calls the callback function 
to do something with the result. 

In this example, an HTTP request is made
in the background. The arrival of the response is signalled by the `load` event 
of the request object in `loadAsset`. We used `loadAsset` to schedule `displayImage`
to run when that happens. 

:::

## Not all callbacks are async!

Example, `Array.forEach(f)` calls `f` synchronously on each element of an
array.

```js
someArray.forEach(soSomething)
```

## Review: Fetch API

Like many newer Web APIs, Fetch is _asynchronous_ by design! 

Why does the second line throw an error? What is the return type of `fetch`?

```js
let response = fetch('myImage.png'); 
let blob = response.blob();
```

::: notes

`myImage.png` starts downloading asynchronously while the second line starts 
executing right away. `response` will be `null` at that point.

In effect, we execute the second line (using the response) 
before the response is ready (before `myImage.png` is downloaded).

We don't know how long the image download will take.

For this reason, `fetch` returns a `Promise` object.

:::

## Review: Promises

We saw how callbacks are used with async code (old approach).

Newer approach is to use [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)

A __Promise__ is an object the represents an operation that will end eventually
(with success or failure).

We say a successful Promise is __resolved__, an unsuccesful one is __rejected__.

## Review: Promises rely on callbacks, too.

We create a Promise by passing it a function that accepts 2 callbacks and
executes whatever operation we want to wait for.

```js
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('foo');
  }, 300);
});
```
---

### Resolve callback

```js
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('foo');
  }, 300);
});
```

The first callback (called `resolve` in this example), is called upon success
and returns the result of the operation we want to wait for (in this case `foo`).

---

### Reject callback

```js
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('foo');
  }, 300);
});
```

The second callback (called `reject` in this example), is called upon error.
We're not using it here because we're not throwing any errors.


## A Promise chain starting with `fetch`

`fetch`, `then`, and `catch` all return Promise objects.

```js
fetch('products.json').then(function(response) {
  return response.json();
}).then(function(json) {
  let products = json;
  initialize(products);
}).catch(function(err) {
  console.log('Fetch problem: ' + err.message);
});
```

---

### Some methods on Promise

* `then` signature: `then(onResolved, onRejected)`, returns `Promise`
* `catch` signature: `catch(onRejected)`, returns `Promise`

## A Promise chain starting with `fetch`

```js
fetch('products.json').then(function(response) {
  // fetch Promise resolves with a response if successful
  // Handle that here:
  return response.json();
}).then(function(json) {
  // The previous `then` returns a Promise that results in a JSON
  // value
  let products = json;
  initialize(products);
}).catch(function(err) {
  // The previous then may throw an error (returning a rejected 
  // Promise)
  // The result passed by a rejected Promise is an Error object 
  // (The error that was thrown)
  console.log('Fetch problem: ' + err.message);
});
```

