---
title:  'Exercise 1.2 - JavaScript review Part 1'
author:
- Maja Frydrychowicz, Jaya Nilakantan
- 420-520-DW
---

Goal: dust off your JS cobwebs

# Prerequisites

If you haven't already, fork and clone the 520-study repository so you have 
your own remote copy in your GitLab account

The starter code is found in the `exercises/01_js_review/` directory

Recall: 

* when you complete the exercise, you will push your solution to your remote fork (i.e., copy)
* your repository will have two remotes: `origin` refers to your 520-study while 
  `upstream` refers to the official 520-study repository maintained by the teachers. 
  Your exercise solutions should be pushed to `origin` only!

# Part 1

Check out a new branch in your repo for your work (don't commit or push 
directly to the `main` branch) remember to push your branch to `origin` 
periodically.

# Part 2

Use VSCode to open your `520-study` directory. We want the root of the 
directory to be at `520-study` so that the VSCode eslint extension uses 
the `.eslintrc.json` at the root of the project.

* __First read the css and the html to understand the instructions below__
* Use the Live Server VSCode extension to test your solution in Chrome and 
  Firefox.


Edit the `script.js` file such that:

1.  Upon `DOMContentLoaded`, you will:
    *   randomly assign either the `labradoodle.png` or `fried-chicken.png` 
        image as the background style of the `image` section
    *   cover the `image` section with a colourful grid by inserting 100 empty 
        divs in the `image` section, assigning to each randomly 
        the class `red`, `white`, or `blue`
2.  When the user clicks on anywhere on the `image` section:
    *   check if the target is a div and not having class `cleared`
    *   if so, set the the class to `cleared`, increment the number of clicks 
        and update the `h3`
3.  If the user clicks on a radio button, check if the choice of image match 
    the real image. Wait 1000 milliseconds for suspense, and then either 
    declare them a winner or a loser!
    *   Every time the page is loaded, the _checked_ state of the radio buttons 
        should be reset.

When you're done, push your branch to `origin`, but _do NOT_ merge it into `main`. 
We recommend that you keep `main` clean so that it matches what the teachers 
publish. Over the course of the semester, you will accumulate many new branches 
for your ungraded exercises