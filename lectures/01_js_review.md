---
title:  'JavaScript Review - Part I'
author:
- Maja Frydrychowicz, Jaya Nilakantan
- 420-520-DW
revealjs-url: revealjs
---

<style>
  ol li {
    list-style-type: lower-alpha
  } 
</style>

## Document Lifecycle

What is the DOM?

a. an event that is fired when the browser is ready
b. a list of HTML elements and their styles
c. a tree-like structure representing the hierarchy of HTML elements
d. a guy who lives on my street
e. I don't know


---

- the correct answer is **c**. It is a tree-like structure where there is a root element - representing the `HTML` element, and children (e.g., `head`, `body`, body might have children like `header`, `section`, etc...). You can read more about the [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction) by following the link. We are particularly interested in the DOM with client-side JavaScript, it is our primary API to the web document

---

- the DOM is not an event, but there are many events related to changes in the DOM. `DOMContentLoaded` is fired when the DOM is ready

---

- CSS styles are not accounted for in the DOM construction. As such, the DOM includes nodes which are never displayed (e.g., `head`). The CSSOM tree is similar to the DOM, but for CSS rules: it is a tree-like structure with the most general rules applicable to a node, followed by a recursive refinement as more specific rules are applied. You can read more about how browsers work [here](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)

---

How do you ensure that a function named `init` is invoked when the DOM is ready?

a. `init();`
b. `document.addEventListener("DOMContentLoaded", init);`
c. `window.onready = init;`
d. `window.addEventListener("load", init);`
e. I don't know   

---

- The correct answer is **b**. Note that you can also listen to event on the `window` object since the event will propogate to the `document`'s parent `window`. 

---

- option a invokes the init methods as soon as the line of code is encountered. There is no guarantee that the DOM is ready - *unless* you included the script with the `defer` attribute, in which case the script won't get executed until after the DOM is ready.

---

- there is no `onready` event handler

---

- the `load` event is fired when the target resource has loaded. In option d, the window's load event is fired when all the objects in the document are loaded, including images and scripts, and the CSSOM has been built

---

Explain the difference between these three lines:

```html
<script src="site.js"> </script> 
<script defer src="site.js"> </script> 
<script async src="site.js"> </script> 
```
---

1. the script is downloaded an executed immediately, regardless of the status of DOM construction

---

2. the script is downloaded in parallel to DOM construction (no blocking), and executes after the HTML is parsed, just before the DOMContentLoaded event. The scripts are executed in order of the script tags in the document

---

3. the script is downloaded in parallel to DOM construction (no blocking), and executes as soon as it is available (can block HTML parsing). You are not guaranteed the order of the scripts.

This [site](https://blog.webdevsimplified.com/2019-12/javascript-loading-attributes-explained/) has nice visual explanations!

## DOM manipulation

Consider that you want to create a new paragraph through JS, and set its text to `"my name is " + user`, where the user variable holds the name as input by the user. Indicate all correct choices

---

a.
  ```js
  const paragraph = document.createElement("p");
  paragraph.textContent = "my name is " + user;
  ```
b.
  ```js
  const paragraph = document.createElement("p");
  const txt = document.createTextNode("my name is " + user);
  paragraph.appendChild(txt);
  ```
c.
  ```js
  const paragraph = document.createElement("p");
  paragraph.innerHTML = "my name is " + user"; 
  ```

d. None of the above, but all are good if you replace `const` with `let`
e. I don't know

---

The correct answer is **a** and **b**. While c will work, there is a risk of [cross-site scripting XSS](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML#security_considerations) when you use `innerHTML` with any direct user input.

---

What's the difference between `const`, `let`, and `var`? 

---

`var` was used prior to ES6; it caused a number of tricky bugs for a number of reasons:

1. `var` variable can be redeclared with no warning
2. `var` variables are hoisted to the top of their scope (function or global), 
   initialized as `undefined` if you try to access before
3. no block scope

Stay away from `var`!!

---

`let` is now preferred over `var` for variable declaration.

1. `let` is block-scoped
2. `let` cannot be reclared in the same scope (but its contents can be updated)
3. `let` are also hoisted in their scope, but remain uninitialised, which causes a ReferenceError if you try to use

---

`const` is similar to `let` except that a `const` can only be initialized once. 

In the question, the `paragraph` was initialized to an Element object; the object's properties are updated, but the element itself has the same reference.

## Adding an element

Consider the following [html](https://www.digitalocean.com/community/tutorials/how-to-make-changes-to-the-dom):

```html
<ul>
  <li>Buy metro pass</li>
  <li>Feed the dog</li>
  <li>Do laundry</li>
</ul>
```
Write the snippet of code to add a list item "Do homework" to the end of the list.

---

```js
const todoList = document.querySelector('ul');
const newTodo = document.createElement('li');
newTodo.textContent = "Do homework";
todoList.appendChild(newTodo);
```
---

If you want to add `newTodo` to the top of the list, you would write

```js
todoList.insertBefore(newTodo, todoList.firstElementChild);
```
---

This [tutorial series](https://www.digitalocean.com/community/tutorial_series/understanding-the-dom-document-object-model) is a good refresher on manipulating the DOM with JavaScript. Many examples in today's review are drawn from there!

## Changing an attribute

Consider the html document `examples/01_DOM/index.html` and the associated css document `examples/01_DOM/site.css`. 

Write a snippet of code that will find the first div and change its class to `section01`.

---

```js
// Select the first div
const div = document.querySelector("div");

// method 1
div.className = "section01";
//method 2
div.classList.add("section01");
//method 3
div.setAttribute("class", "section01");
```

## setTimeout

Explain what the following code does:
```js
setTimeout(() => {
  console.log("Hello World!");
}, 1000);
```

---

The `setTimout` function is a built-in method of the Window object. It typically takes 2 parameters: a function and a delay in milliseconds.

It will invoke the first parameter (the function) after the delay has elapsed.

---

In fact, in reality, the delay might be *longer* that the value specified. There are [multiple potential reasons](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout#reasons_for_delays) but the one that we want to focus on in this review is late timeouts.

---

JavaScript is single-threaded (for the most part). This means that any code that is running in the thread has to run to completion. An event can be handled only after all on-going tasks are done.

---

Consider the [code](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout#reasons_for_delays)
```js
function foo() {
  console.log("foo has been called");
}
setTimeout(foo, 0);
console.log("After setTimeout");
```
What will be the output on the console?

---

```
After setTimeout
foo has been called
```
"This is because even though setTimeout was called with a delay of zero, it's placed on a queue and scheduled to run at the next opportunity; not immediately. Currently-executing code must complete before functions on the queue are executed, thus the resulting execution order may not be as expected."

---

This [page](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop) has a great description plus an image of how events work with respect to the call invocation stack.
