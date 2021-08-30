---
title:  'Exercise 2.1 - JavaScript review - Fetch and Promises'
author:
- Maja Frydrychowicz, Jaya Nilakantan
- 420-520-DW
---

Goal: Async programming with Promises, JSON and object

# Prerequisites

The starter code is found in the `exercises/02_js_fetch/` directory

# Reminders 

* do your work in a new branch (e.g., `exercise2-1`)
* when you complete the exercise, you will push your solution to your remote fork (i.e., copy)
* remember, your repository has two remotes: `origin` refers to your 520-study while 
  `upstream` refers to the official 520-study repository maintained by the teachers. 
  Your exercise solutions should be pushed to `origin` only!
* Don't merge back into `main`. This will avoid future problems when you are synching your fork with `upsteam`. if you want to practice with merge requests, create a branch called `exercises`, for example, and branch `exercises2-1` off `exercises`. You will use the GitLab Web UI to create the Merge Request to merge  `exercise2-1` into `exercises`.
* remember to push your branch to `origin` 
periodically.

# Introduction

We will be building a trivia game, using the [Open Trivia Database API](https://opentdb.com/api_config.php) to generate trivia questions.

Your application will present the question and the possible answers in a random order, and tell the user if they got the answer correct or not!

# Instructions

Use VSCode to open your `520-study` directory. We want the root of the 
directory to be at `520-study` so that the VSCode eslint extension uses 
the `.eslintrc.json` at the root of the project.

* __First__ open the URL https://opentdb.com/api.php?amount=1&category=18 through your browser (the API wants a GET request) and look at the JSON result. Tip: if you use Firefox, you will get a nicely formatted JSON view

* __Second__ read the the html to understand the instructions below
* Use the Live Server VSCode extension to test your solution in Chrome and 
  Firefox.


Create a `script.js` file, and refer to it in the `index.html` file. Your JavaScript code should:

1.  Upon `DOMContentLoaded`, you will invoke the function `getQuestion`
2. `getQuestion` will query the URL `https://opentdb.com/api.php?amount=1&category=18` to get a random trivia question related to computer science. Remember that an http query is asynchronous, so use a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
    * display the question in a paragraph within the `question` section
    * add the `correct_answer` to an array, along with the contents of the array of `incorrect_answers`. Sort the answers alphabetically
    * create radio button elements and labels; set the answers as the label text and as the values of the radio buttons. Set an appropriate click event handler

    **Note**: this service is sending escaped HTML entities (e.g., instead of seeing `"`, we see `&quot;`). Use innerHTML instead of text content **only** if you trust the source.

    * if there was an error with the Promise, write the error to `console.error` as show a user-friendly error message in the DOM with the play again button described below.

3.  If the user clicks on a radio button, check if the answer matches and then either 
    declare them a winner or a loser in the `result`! Display a play again button

4. If the user clicks on "play again", reset the display, and invoke `getQuestion`. 


When you're done, push your branch to `origin`, but _do NOT_ merge it into `main`
and _do NOT_ make a merge request to `520-study`.

We recommend that you keep `main` clean so that it matches what the teachers 
publish. Over the course of the semester, you will accumulate many new branches 
for your ungraded exercises. 

Since it's an ungraded exercise, making a Merge Request is not necessary.