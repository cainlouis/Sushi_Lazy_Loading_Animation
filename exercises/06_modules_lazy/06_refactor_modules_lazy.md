---
title:  'Exercise 6.1 - Refactor code into modules and apply lazy-loading techniques'
author:
- Jaya Nilakantan
- 420-520-DW
---

Goal: More practice refactoring existing code

# Prerequisites

The starter code is found in the `exercises/06_modules_lazy/` directory. Important! There is a new `.eslintrc.json` file that includes a rule for modules.

# Reminders 

* do your work in a new branch (e.g., `exercise6-1`)
* when you complete the exercise, you will push your solution to your remote fork

# Instructions

Run the application at `exercises/06_modules_lazy/` and examine the code. You will:

1. Separate the script into two modules:

  * one module named `calendar.mjs` defines and exports `getDay`
  * `script.mjs` will import everything from `calendar.mjs` as a module object `Calendar`  (e.g., `import * as Calender from ...` )

2. Use a `picture` tag to show the first image only when the viewport with is greater 1168 px, otherwise the second image

3. Lazy load the third image using the IntersectionObserver. Not that the default image is an in-line `svg`, you can learn more [here](https://css-tricks.com/using-svg/)

When you're done, push your branch to `origin`, but _do NOT_ merge it into `main`
and _do NOT_ make a merge request to `520-study`.

Since it's an ungraded exercise, making a Merge Request is not necessary.

