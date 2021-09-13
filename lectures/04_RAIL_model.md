---
title:  'RAIL model'
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

## The RAIL model

We learnt about the Google Core Web Vitals. Why do we need another set of metrics?

## Core Web Vitals

* Core Web Vitals concentrate on user experience in:
  * loading (LCP)
  * interactivity (FID)
  * visual stability (CLS)
* focus is on the user's initial experience

## RAIL - Response Animation Idle Load

![RAIL performance model](https://web-dev.imgix.net/image/admin/uc1IWVOW2wEhIY6z4KjJ.png?auto=format&w=845) [source](https://web.dev/rail/)

---

* RAIL breaks user experience into key actions (tap, scroll, load) with performance *goals*
* provides *guidelines* on how to acheive the goals
* user's perceptions of delays are different depending on the context

---

> Users perceive performance delays differently, depending on network conditions and hardware. For example, loading sites on a powerful desktop machine over a fast Wi-Fi connection commonly happens in under 1 s and users have grown accustomed to that. Loading sites on mobile devices with slow 3G connections takes more time, so mobile users are generally more patient and loading in 5 s on mobile is a more realistic goal.

[source](https://web.dev/rail/)

## Load

Goal: deliver content and become interactive in under 5 seconds

* first load in a mid-range mobile device with a slow 3G connection
* subsequent loads under 2 seconds
  * due to cached resources

## Response

Goal: process user events in under 50 ms

* user initiated transaction must be completed within 100 ms
  * this means user events have to be processed in 50 ms
  * this gives enough time for other tasks that need to happen

## Idle

Goal: maximize work done in idle time to better chances of being able to Respond in 50 ms

* batch work in 50 ms increments

## Animation

Goal: produce a frame in 10 ms

* each animation frame should be produced in 10 ms. The maximum budget for 60 fps is 16 ms, but browsers need time to render each frame
* beware of jank!
* scrolling, dragging, entrance/exit are all types of animations

## Optimizing RAIL

Motto: measure first, then optimize. Don't waste time optimizing for very small gains

## Load Guidelines

* test load performance
  * dev tools
  * once deployed, [WebPageTest](https://www.webpagetest.org/easy) allows you to test simulating a typical baseline mobile phone (mid-range Android) on a slow 3G network
* focus on above-the-fold resources (the critical resources)
* optimizing Load performance is similar to optimizing the Critical Rendering Path to speed up the Largest Contentful Paint

## Response guidelines

* if an action takes longer than 50 ms, provide some feedback
* use the 100 ms window for other necessary work, if it is all not required to process user input
  * user won't perceive the difference between instantaneous and 100 ms

## Idle guidelines

* use idle time to complete deferred or lower-priority tasks
  * e.g., tasks not done during initial load sequence are done during idle time later
* work performed in idle time should not be more than 50 ms; this is to be able to Respond in 50 ms
* user interactions take higher priority over work pending for idle time

## recall: batching DOM changes with requestAnimationFrame

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
## Animation guidelines

* animations should take about 10 ms

---

* try to stick to Compositing-only animations. These property changes don't require Layout recalculation or Paint
* compositing-only styles are `transform`s and `opacity`
  * give the element that you plan on animating the `will-change:transform` style. This allows the browser to prepare for the upcoming changes, by putting the element in its own layer
  * note that promoting an element to its own layer requires memory: don't promote elements unnecessarily

---

* use [`DocumentFragment`s](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment) to create a DOM subtree and append or insert the fragment into the DOM
  * because all of the nodes are inserted into the document at once, **only one** layout and render is triggered instead of potentially one for each node inserted if they were inserted separately

## Animation with transform - example

`examples/04Animation` directory contains 3 different example animations (based on [source](https://medium.com/ag-grid/javascript-gpu-animation-with-transform-and-translate-bf09c7000aa6))

Look at the code and run them, looking at their Performance.

## Example 1

Run Performance tools when click the button.

Notice the Style-Layout-Paint cycle

## Example 2

Reverse is much smoother: transform does not cause repeated Layout calculations. 

## Example 3

Slight improvement in times due to the DocumentFragment. Improvement would be more noticeable if the DOM contained many nodes.

## Using a DocumentFragment

A `DocumentFragment` is a document tree without a parent. Since it is not part of the active DOM tree, changes you make won't incur the same performance hit: there is no risk of reflow.

---

Typical use of a DocumentFragment:

* create one
* assemble a DOM subtree
* append or insert the entire fragment into the DOM
  * only 1 reflow and render is triggered

---

### Create a fragment

`let fragment = new DocumentFragment();`

__or__

`let fragment = document.createDocumentFragment();`

---

### Fill it

`fragment.appendChild(element);`

---

### Insert in DOM

`destination.appendChild(fragment);`