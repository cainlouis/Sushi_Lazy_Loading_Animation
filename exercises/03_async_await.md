---
title:  'Exercise 3.1 - Using async-await syntax'
author:
- Maja Frydrychowicz, Jaya Nilakantan
- 420-520-DW
---

Goal: Async programming with async-await syntax

# Prerequisites

You completed `exercises/02_js_fetch/`.

# Reminders 

* do your work in a new branch (e.g., `exercise3-1`)
* when you complete the exercise, you will push your solution to your remote fork (i.e., to `origin` only)
* Don't merge back into `main`. 

# Instructions

`async` and `await` keywords are [syntactic sugar](https://en.wikipedia.org/wiki/Syntactic_sugar) on top of Promises. Remember that behind the scenes, an `async` function returns a Promise, and an `await` expression within an `async` function causes JavaScript to pause on this line while waiting for the Promise to resolve. But this does not block the main thread! Just like a `then` clause with a Promise, an `await` expression waits for the Promise to resolve; any code in the call stack or events in the event queue can be treated while waiting for the Promise resolution. It is like the `await` expression cuts the function at that point; any subsequent code in that function waits for the result, but that doesn't prevent the main thread from executing other code.

In this exercise, you are going to change your solution to exercise 2.1 to use `async-await` syntax with the Fetch API.

**Use the rest of the lab period to make headway in Assignment 1.**
