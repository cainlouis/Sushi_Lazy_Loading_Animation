---
title:  'Week 2 Preparation: More on JavaScript functions, Avoiding layout thrashing, RequestAnimationFrame'
author:
- Maja Frydrychowicz, Jaya Nilakantan
- 420-520-DW
---

# Introduction

__Look at the material below with the goal of broad understanding__. You don't 
have to understand or remember all the details, just the big ideas.

* Write down questions that come to mind.
* Take high-level notes.

# Concepts

These are the keywords you should pay most attention to:

* lexical environment
* closures, captured variables
* function declaration, function expression
* IIFE
* function execution context
* global namespace
* steps in Critical Rendering Path
* frame rate, requestAnimationFrame
* layout thrashing/reflow
* `await` keyword
* `async function` and Promises

# Tasks

Read the following:

* [Immediately Invoked Function Expression](https://developer.mozilla.org/en-US/docs/Glossary/IIFE)
  * Pay attention to the first use case (avoiding global namespace)
* Closures:
  * [Simple Example](https://eloquentjavascript.net/03_functions.html#h_hOd+yVxaku)
  * [Event Handlers Example](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures#practical_closures)
  * [Module Pattern Example](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures#emulating_private_methods_with_closures)
* [async/await syntax](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await)
  * Read up to up to (not including) the _Awaiting a Promise.all()_ section.
* [Critical Rendering Path](https://developer.mozilla.org/en-US/docs/Web/Performance/Critical_rendering_path)
* [Avoid Large, Complex Layouts and Layout Thrashing](https://developers.google.com/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing)
  * You can _skip_ the Flexbox section ("Use flexbox over older layout models")