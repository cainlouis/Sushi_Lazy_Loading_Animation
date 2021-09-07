---
title:  'Forced Synchronous Layout'
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

## Google' Core Web Vitals

* Largest Contentful Paint (LCP)
* First Input Delay (FID)
* Cumulative Layout Shift (CLS)

[source](https://support.google.com/webmasters/answer/9205520)

---

* Largest Contentful Paint (LCP)
  * The amount of time to render the largest content element visible in the viewport, from when the user requests the URL. 
  * The largest element is typically an image or video, or perhaps a large block-level text element. 
  * This is important because it tells the reader that the URL is **actually loading**.

---

* First Input Delay (FID)
  * The time from when a user first interacts with your page (when they clicked a link, tapped on a button, and so on) to the time when the browser responds to that interaction. 
  * This measurement is taken from whatever interactive element that the user first clicks. 
  * This is important on pages where the user needs to do something, because this is **when the page has become interactive**.

---

* Cumulative Layout Shift (CLS)
  * measures the sum total of all individual layout shift scores for every unexpected layout shift that occurs during the *entire lifespan* of the page. 
  * The score is zero to any positive number, where zero means no shifting and the larger the number, the more layout shift on the page. 
  * This is important because having pages elements shift while a user is trying to interact with it is a **bad user experience**. 

## Other important measures

* First Contentful Paint (FCP) 
  * tells you when content is first painted to the screen, which is an important milestone in the user's perception of the page load
* Time to Interactive (TTI)
  * the point at which the page appears ready enough to handle user interactions.

## 60FPS not just for games

jank, *noun*

<dl>
<dt>Choppy performance</dt>
   <dd>"Scrolling on this page feels janky"</dd>
<dt>Discontinuous, surprising experience</dt>
   <dd>"What's with the jank on this page?"</dd>
</dl>

[source](https://www.igvita.com/slides/2012/web-performance-for-the-curious/#31)

---

It's better to be at consistent 30FPS then jump between frame-rates (aka, jank)

## Tasks done for every frame

![picture of frame](img/frame.jpg) [source](https://developers.google.com/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing)

These tasks are done in the main thread!

## Usual order of tasks

1. JavaScript
2. Style calculations
3. Layout

## What causes Layout?

- insert, remove or update an element in the DOM
- hide a DOM node with `display:none`
- modify content on the page, e.g. the text
- move a DOM element
- animate a DOM element
- change certain CSS styles
- resize the window
- scroll
- change the font
- ... 

[source](https://sites.google.com/site/getsnippet/javascript/dom/repaints-and-reflows-manipulating-the-dom-responsibly)

## Comprehensive list

[What forces layout / reflow](https://gist.github.com/paulirish/5d52fb081b3570c81e3a)

## Forced synchronous layout

Forced synchronous layout happens when we force the browser to perform layout earlier.

## How it happens

JS **reads** the layout values from the previous frame when it can.

```js
// Schedule our function to run at the start of the frame.
requestAnimationFrame(logBoxHeight);

function logBoxHeight() {
  // Gets the height of the box in pixels and logs it out.
  console.log(box.offsetHeight);
}
```

---

If you change styles, and then read the layout value, the browser has to first apply the style change, calculate layout, then return to JavaScript to read the value.

---

Browsers tries to optimize layout changes by batching them, but write-read of styles forces the browser to perform the change immediately.

---

```js
// Schedule our function to run at the start of the frame.
requestAnimationFrame(logBoxHeight);

function logBoxHeight() {
  box.classList.add('super-big');
  // Gets the height of the box in pixels and logs it out.
  console.log(box.offsetHeight);
}
```

## Solution

1. do the style reads first, so the browser can use the previous frame's values
2. then do any style changes that require layout

---

```js
function logBoxHeight() {
  // Gets the height of the box in pixels
  // and logs it out.
  console.log(box.offsetHeight);

  box.classList.add('super-big');
}
```

## Layout trashing

```js
function resizeAllParagraphsToMatchBlockWidth() {
  // Puts the browser into a read-write-read-write cycle.
  for (let i = 0; i < paragraphs.length; i++) {
    paragraphs[i].style.width = box.offsetWidth + 'px';

  }
}
```

---

```js
function resizeAllParagraphsToMatchBlockWidth() {
  // Puts the browser into a read-write-read-write cycle.
  for (let i = 0; i < paragraphs.length; i++) {
    paragraphs[i].style.width = box.offsetWidth + 'px';
                        ^^^         ^^^^^^^^^^
                        write       read   
  }
}
```

## Solution
```js
// Read once, before writing
var width = box.offsetWidth;

function resizeAllParagraphsToMatchBlockWidth() {
  for (var i = 0; i < paragraphs.length; i++) {
    // Now write.
    paragraphs[i].style.width = width + 'px';
  }
}
```

## How would you correct?


```js
el.style.left = el.offsetLeft + 10 + "px";
```
 
```js
for(big; loop; here) {
    el.style.left = el.offsetLeft + 10 + "px";
    el.style.top  = el.offsetTop  + 10 + "px";
}
```

[source](https://sites.google.com/site/getsnippet/javascript/dom/repaints-and-reflows-manipulating-the-dom-responsibly)


## Answers

```js
let left = el.offsetLeft;
el.style.left = left + 10 + "px";
```

```js
let left = el.offsetLeft;
let top  = el.offsetTop;
let e-sty = el.style;
for(big; loop; here) {
    left += 10;
    top  += 10;
    e-sty.left = left + "px";
    e-sty.top  = top  + "px";
}
```

## rAF instead of setTimeout/setInterval

Visual changes should be done using `requestAnimationFrame`s instead of setTimeout/setInterval.

---

setTimeout callback will try to run at a fixed time, but if the main thread is busy, it may not run in time for the frame -> this causes dropped frames.

Goal: keep JavaScript to 3 or 4 ms/frame

## Recall: requestAnimationFrame
```js
/**
 * If run as a requestAnimationFrame callback, this
 * will be run at the start of the frame.
 */
function updateScreen(time) {
  // Make visual updates here.
}
requestAnimationFrame(updateScreen);
```
[source](https://developers.google.com/web/fundamentals/performance/rendering/optimize-javascript-execution#use_requestanimationframe_for_visual_changes)

## Batching DOM operations 
```js
let taskList = breakBigTaskIntoMicroTasks(monsterTaskList);
requestAnimationFrame(processTaskList);

function processTaskList(taskStartTime) {
  let taskFinishTime;

  do {
    // Assume the next task is pushed onto a stack.
    let nextTask = taskList.pop();

    // Process nextTask - DOM changes done here
    processTask(nextTask);

    // Go again if there’s enough time to do the next task.
    taskFinishTime = window.performance.now();
  } while (taskFinishTime - taskStartTime < 3);
  //set up for the next frame
  if (taskList.length > 0)
    requestAnimationFrame(processTaskList);
}
```

## Assignment 1

Try rewriting the description animation with a `requestAnimationFrame` instead of a timeout/interval, and be careful to avoid  layout thrashing!



