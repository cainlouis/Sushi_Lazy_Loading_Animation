---
title:  'Questions from the reading quizzes'
author:
- Jaya Nilakantan
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

## Questions in Quiz 3

Are modules the way javascript becomes a OOP language?

--- notes

JS has classes since ES6, but that is really just syntactic sugar for constructor functions. It also has protypical inheritance, which is not the same as OO inheritance; you can add (extend) or modify an object, but concepts like subtype polymorphism don't really apply.

[Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) have to do with splitting up code and packaging and deploying it. So it is a concept closer to a Java `package` or a C# `assembly` than is is to OO.

---

Upon calling an `async` function that uses the `await` keyword, the "main thread" goes through the async function code until it reaches the await keyword. Does that mean that it does not compute 2 processes in parallel?

--- notes

Exactly. When it reaches the `await` keyword, it treats the rest of the function as a callback that will be invoked when the awaited result is available. In the meantime, the main thread continues with other code that is not in the `async` function. When there is nothing left to do in the call stack, the main thread will be ready for any events in the queue, including the await callback.

---

In the last reading about IIFE why were they using the assert.equals function?

--- notes

`assert` is not a standard function in the Window object. That example came from the book "JavaScript for impatient programmers" and you may notice in [chapter 9](https://exploringjs.com/impatient-js/ch_assertion-api.html) the `assert` module is imported from `node.js`.

Assertions are used in **unit testing**: they state facts about values or conditions; and if the fact is not true, and exception is thrown (i.e., the test case fails).

The book uses it to show the expected results.

---

If you don't append all elements to the document right away, but instead append them to an element and then append that element to the documents. Does that have the same performance as DocumentFragment?

--- notes

Great question from more than 1 student! [Stack Overflow to the rescue](https://stackoverflow.com/questions/39795563/documentfragment-performance-vs-appendchild-on-unattached-element)

---

Is it a good idea to remove comments to apply minification? Is minification worth it in the long run, if we have different people working on the website, since the names of variables will become vague?

--- notes

You **must** retain your non-minified and easy to read code for development. Minified files are for deployment only.

---

I am wondering if we can use DocumentFragment to sort  html elements for A1? Is this possible? Would that be better than sorting the actual array?

--- notes

My gut feeling is that sorting the array of objects, creating a new DocumentFragement and filling it with the sorted cards, then hiding the other sorted container and appending this one would be the most efficient. Keeping track of the already-sorted containers might be very efficient in cases where the user sorts multiple times.

---

Are IIFE's commonly used in the industry?

--- notes

Yes they are. IIFE's are anonymous, so they don't clutter the global scope.

But the `module pattern` may be decreasing in popularity as the ES class syntax provides (prototype-based) inheritance as well as [private fields](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields). 

---

Is the RAIL method the go to model?

--- notes

I'm feeling some [imposter syndrome](https://en.wikipedia.org/wiki/Impostor_syndrome) in answering this question! [MDN](https://developer.mozilla.org/en-US/docs/Glossary/RAIL) writes:

> The performance mantra of RAIL is "Focus on the user; the end goal isn't to make your site perform fast on any specific device, it's to make users happy." 

¯\_(ツ)_/¯

---

Would using inline CSS or JS in the HTML reduce render blocking time? It does not need to wait for external files

--- notes

Yes it would, and that is what we are supposed to do with Critical CSS (above the fold). But... there has and will always be a tradeoff between highly performant code and maintainable/readable code. Even though this course focusses on performance, some best pratcices are too important to throw out for a few milliseconds improvement.

---

In what way does the RAIL model help web developers? 

--- notes

It helps developers to think about all stages of user interaction with a web page, not just initial load times. User Experience has a direct correlation with a website's success.

---

How can using DocumentFragment improve the code readability?

--- notes

It doesn't really improve readability compared to filling in a detached element, for example. We are looking at it because there can be a performance gain **without** a loss in readability or maintainability.

---

In what kind of cases would we need to use different CSS according to the size of monitor? It seemed like a good idea but I have never seen a case like that.

--- notes

Media queries are essential for a better mobile experience. Segue into a demo of Assignment 2!

---

Are the requirements of the RAIL model possible with the knowledge we currently possess, if we were to work on a website?

--- notes

There are some things that we have looked at (using rAF instead of setInterval and avoiding reflow, ways to speed up the Critical Rendering Path), but other aspects that we haven't touched upon at all (how the heck do we know we have idle time?).

---

Why use an IIFE instead of directly writing the code? Why must the code be inside of a function?

--- notes

Good question and I'm surprised I wasn't stopped in class!

The big advantage that IIFE's give is their local scope. Variables and functions defined within them are only available within the IIFE or to closures that the IIFE returns. So it is a way to hide/encapsulate/get data privacy. It is also a way to remove everything, or just about everything from global scope - which is usefule once we start mporting modules.

---

Would loading="lazy" be used in situations such as when we want to load the overflow on the bottom but only once the user reaches it? (like often on shopping websites or social media).

--- notes

Yes, exactly! But since `Safari` doesn't support it, we will be learning a programmatic way to accomplish this.

---

How can we display a placeholder image while an image is being lazy loaded?

--- notes

When we look at the programmatic way of lazy loading, we'll see that we can start the image with the placeholder. Spoiler: Coming up in Assignment 2!

---

Can we limit CSS blocking almost entirely, but still make the page look nice. Like can you trigger CSS like in JS?

--- notes

You could eliminate all CSS files and have your styles done programmatically: but I am fairly sure that your performance will be far far worse. The browser has to compile and run the JS code which ties up the main thread. You risk exposing your user to many more [flashes of unstyled content](https://en.wikipedia.org/wiki/Flash_of_unstyled_content) than those due to slow loading stylesheets

---

Is async/await the most popular way to code at the moment? Can you literally make anything a Promise now?

--- notes

Yes and yes!

---

How does the print attribute stop the blocking for css? And what is this??? How exactly does the "media" attribute work?

--- notes

When the browser sees the `media` attribute for the `link` `stylesheet` is `print`,  the file is still downloaded (at a lower priority) but the content is not render-blocking since the browser knows it's media is `screen`. But if you decide to print the page, the print css is used. Here is an [example](https://css-tricks.com/css-tricks-finally-gets-a-print-stylesheet/).

---
Notice: preconnect to third paty sites, critical css, deferred stylesheets. But... the `print` is within the single stylesheet with an `@media print {}` rule.

---

Do users mind when websites makes CSS non render blocking to improve speed?

--- notes

They don't mind if the css was not critical. They will probably hate it if the CSS was critical though!

--- 

How were the times determined for the RAIL model?

--- notes

Google measuring tonnes of stuff (that you didn't realize!) to figure out how patient users are.

---

How the Firefox counterpart works with their tools and performance reading?

--- notes

The tools are very similar. But since Google's business model is advertising revenues, they have an interest in providing tools that help developers make better websites that lead to more successful advertising on the web.

¯\_(ツ)_/¯

---

Is the DocumentFragment temporary for one use or is it capable of being reused after being done with it once we insert it in the DOM?

--- notes

Let's [try](https://dawsoncollege.gitlab.io/520JS/2021-08/520-study/)!

```js
let df = document.createDocumentFragment();
let p = document.createElement('p');
p.textContent = "hi!";
df.appendChild(p);
let body = document.querySelector("body");
body.append(df);

p = document.createElement('p');
p.textContent = "bye!";
df.append(p);
body.append(df);
``` 

---

From [MDN](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment)

> append or insert the fragment into the DOM ... Doing this moves the fragment's nodes into the DOM, leaving behind an empty DocumentFragment. 

---

Is there a way to append 2 different elements into 2 different sections in the main HTML using DocumentFragment?

--- notes

Yes. But the DocumentFragment is emptied each time.

---

 Is it practical to make async functions that only adds elements to the DOM, and not necessarily fetching or returning a Promise?

--- notes
 
 If you have a lot to add to the DOM and it is going to take a while, it might be worthwhile to do it in smaller async functions. This gives a chance for other events to be processed.

---

If the html file for a page has a large size, how do you improve it so that the critical components are downloaded first?

--- notes

Great question! If a lot of the html is under the fold, then we can let JS add it; JS can fetch the remaining file and append it (e.g., innerHTML).

---

What is the Intersection Observer API and what is its purpose?

--- notes

It allows your code to detect when a part of the DOM is getting close to or in the viewport. It can be used for infinite scrolling for example (detecting that the bottom of the html is in the viewport). We will use it for lazy-loading images in Assignment 2!

---

When should we use an Immediately Invoked Async Arrow function?

--- notes

If you want to invoke an async function at the top level, using the `await` keyword instead of `then`, you need to put that code in an `async` function (`await` only lives in `async` functions). So the easiest way to have code that would run at the top level is to put it in an IIFE. The IIFE can be an anonymous function, or an arrow function...

---

What is the difference between async and defer? DO they ultimately do the same thing?

---

Not really. BTW, I'm not a fan of W3 overloading the keyword `async` 😞

`async` scripts are downloaded in parallel to the DOM being built, but will execute as soon as the download is over. `defer` scripts also are downloaded in parallel to the DOM being built, but execute only after the DOM is built. `<script>` tags without an attribute block HTML parsing while they download an immediately execute.

Use `defer` for scripts that depend on the DOM; use `async` for third party modules that don't have dependancies on the order in which they download.

---

What other critical resources can there be outside of css and js?

--- notes

Fonts

---

How does async/await code look synchronous when it is asynchronous?

--- notes

Syntactic sugahhh

It can get a bit confusing though. 

---

How can I ensure that my ESLint is working on my code?

--- notes

Any bad tabbing should result in an error ... in a js file. ESLint doesn't look at js within HTML or md files.

---

How to defer css?

--- notes

```html 
<link rel="preload" href="uncritical.css" as="style" 
  onload="this.onload=null; 
          this.rel='stylesheet'"
>
```

---

What is a better practice for passing variables between many promises: using nested promises or moving the variable(s) in question, in the outer scope? Which one is the most efficient?


--- notes

Nested promises gets messy to read. As the [reading](https://2ality.com/2017/08/promise-callback-data-flow.html) showed, I think moving the declaration to the outer scope is the cleanest. i.e.,:

```js
let connection;
try {
  connection = await db.open();
  const result = await connection.select({ name: 'Jane' });
  ···
} catch (error) {
  // handle all errors
} finally {
  connection.close();
}
```
---

Would compressing images reduce its quality?

--- notes

Yes, if you were going to print them on a high-resolution printer. Not necessarily even noticable on a mobile screen. [Coming soon](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/sizes) - `srcset` and `sizes` attributes on `img` tags to specifiy different images for different resolutions.

---

How much is performance affected if you use async await rather than just promises?

--- notes

Minimally? `async/await` uses the exact same machanism as plain vanilla Promises behind the scenes.

---

What if we were to remove multiple elements, do we use a document fragment as well ?

--- notes

We usually remove a whole branch with a `removeChild` or `remove` method. I don't think a DF is useful.

---




## Questions not understood/answered 😅

With lazy loading, would a smaller viewport load faster vs a larger viewport?

--- 

How do you pass data between promises and callbacks?

---

Should we always lazy load css that isn't important to the layout?

---

What types of scripts are more likely to be preloaded?

---

What is cache eviction and how major of a problem does it represent for web applications, compared to latency? What can be done to CSS and JS files to reduce it?

---

If there's non rendering CSS, does that mean there's also non rendering HTML?

---

If we were to add a script to a document fragment, which event listener should we use to start out script ?