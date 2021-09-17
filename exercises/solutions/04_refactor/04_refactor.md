---
title:  'Exercise 4.2 - Refactoring JavaScript'
author:
- Jaya Nilakantan
- 420-520-DW
---

Goal: Practice refactoring old code

# Prerequisites

The starter code is found in the `exercises/04_blocking_reflow/` directory

# Reminders 

* do your work in a new branch (e.g., `exercise4-2`)
* when you complete the exercise, you will push your solution to your remote fork (i.e., copy)

# Instructions

Run the application at `exercises/04_blocking_reflow/` and examine the code. You will:

1. Rewrite the `XMLHTTPRequest` code to use `fetch` with `async` and `await`.
2. Rewrite the animation to use `requestAnimationFrame` and remove the forced synchronized layout
3. Encapsulate all in an IIFE to limit bindings in global scope

When you're done, push your branch to `origin`, but _do NOT_ merge it into `main`
and _do NOT_ make a merge request to `520-study`.

Since it's an ungraded exercise, making a Merge Request is not necessary.