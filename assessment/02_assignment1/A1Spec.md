---
title:  'Assignment 1'
author:
- Maja Frydrychowicz, Jaya Nilakantan
- 420-520-DW
---


This is an __individual__ assignment and must not be shared or published.

__Deadline__: see Moodle. In case of _exceptional_ circumstances you may request
an extension by sending a MIO to your teacher. Otherwise, late submissions are 
not accepted.

_Read all the assigment instructions before you begin_.

# Introduction

In this assigment, you will:

* Use browser developer tools and other tools to evaluate the performance 
  characteristics of some existing code (`assessment/02_assignment1/SinglePageApp`).
* Modify the code to improve performance.
* Write a brief report about the performance problems and fixes.

# General Requirements

## git and GitLab

Use the Protected Branch Workflow in `520-study-LASTNAME`. 
Since this is an individual assignment, this means:

* Don't make any commits on `main` or merge into `main`.
* Work on a feature branch. To ease grading, __please call your branch `A1`__
* Push `A1` to `origin` regularly to back-up your work.

See the __Submission__ instructions at the end of this document. You will open
a Merge Request on GitLab. 

* Make sure your Merge Request has a clear title.
* In the MR description, write down any challenges you faced; explain if there
  are any parts missing in your submission and why.

### Commit Style

Ideally you should make many small commits that record the progress of your
work at logical steps. 

Your commits messages should be short and descriptive. Use a consistent writing 
style. 

It is a widely adopted practice to start commit messages with a
_imperative verb_, so that each message sounds like a command or a step in an
algorithm. This makes the history easier to read when use git log and other tools.

Good:

* "List all passengers by name."
* "Remove multiplication method."

Bad:

* "Stuff for Assignment 1" _(Does not start with imperative verb)_
* "event handler" _(Not a sentence)_
* "Removed multiplication method" _(Does not start with imperative verb)_
* "Replace all click handlers in the code with just one handler on a parent element." _(More than 50 characters long)_

If you need to write a longer commit message, the first line should be a short
summary, following by more details. Example:

```
Refactor all click handlers

There were too many click handlers attached on individual elements
all over the codebase. This slows down the code and make changes
more difficult.

Instead we can attach a handler just once on a parent element.
```

👉 You can use `git commit --amend` to modify your most recent commit, including
the message. If you modify commits that you've already pushed to a remote, you'll
have to (force) `git push -f origin mybranch` to update the branch remotely.

## Code Style

The `520-study-LASTNAME` repo contains a file called `.eslintrc.json` that
specifies the code style required in this course. In the
school labs, VSCode is configured with the `ESLint` extension and should
automatically warn you about code style issues. (See View > Problems)

For example, the following code should cause ESLint to report problems (at least 3 errors, 4 warnings) after you save the js file, if your VSCode is configured properly:

```js
if ( Math.floor(Math.random()*2) == 0) {
    image.style.background = "url(./labradoodle.PNG)";
    rand_image = "labra";
  } 
else {
  image.style.background = 'url(./fried-chicken.PNG)';
  randImage = "chicken";
}
```

You can use ESLint to automatically fix most problems. Either `eslint --fix`
at the command-line or, in VSCode hit `Ctrl+Shift+P` and search for "ESLint: Fix
all autofixable problems". 

# Specification

## Report

As you follow the rest of this assignment spec, write a report in a file 
called `assessment/02_assignment1/SinglePageAppPerformance.md`
using [Markdown](https://www.markdownguide.org/basic-syntax/)
syntax. (Markdown is automatically coverted to HTML on GitLab and GitHub, by the
way.) 

Feel free to add screenshots or diagrams if you wish. (Adding images to Markdown
works very much like including images in HTML.)

Your report should contain a summary of what you learned about the performance of
`SinglePageApp`. Here is a template:

```
# Performance of SinglePageApp

## Introduction and Methodology

<!-- Briefly state how you manually tested the app, and in what environment 
(which browsers, what browser versions, what kind of device, OS,
width and height of viewport as reported in the console with `window.screen) -->

## Areas to Improve

### Functionality

<!-- What you notice from manual testing: what works, what is broken? -->

### Network

#### No Throttling

#### Slow 3G

## Summary of Changes

## Results and Conclusion

```

## Get to know the application

__Before you begin, take note of your testing environment (see report template above).__

Open the application that is in `assessment/02_assignment1/SinglePageApp` through VSCode's LiveServer. Play around with it, trying out the links. Are there error messages on the console? Note any issues that you notice. 

## Using Performance tools

Open the page using the LiveServer extension on VSCode in an incognito window. Open Dev Tools, detach but make sure the browser window is in the foreground (you might need to resize your windows to half-width).

1. Use the Lighthouse tab to generate a Performance report for a Mobile device, simulating throttling. Write about on the performance metrics and areas to improve in your report.

2. Use Chrome Devtools Network panel with cache disabled. Look at the Network activity and note the waterfall and the DOMContentLoaded and Load times. Try scrolling on the page to see how the images are being loaded. Note any usabiligty concerns.

Now clear the Network tab (the no-entry icon near the top left), throttle for a slow 3G network and reload. Repeat the steps above (note the waterfall, and scroll the page to assess the usability) Are there network requests that are downloaded after the load event?  

3. Use Chrome Devtools Performance panel. This tool may be sloooow, so check Diasbale JavaScript samples but keep the Screenshots checked. Keep network and CPU at no throttling. Click on the reload icon to start profiling and reload the page; then go to the page and scroll down, then return to Dev Tool to end the profile. This will take around a few seconds.

Move your mouse from left-to-right over the screenshots: did you capture your scrolling? If not clear this profile (the no-entry icon) and restart.

__Save the profile (Down Arrow) in json format and add it to your git branch in the same directory
as your report__. If you need to pause your work, you can re-open this json file in the Performance
panel at a later time.

Are there where frames are dropped? Is you CPU running at close to 100%? If so, zoom in on these areas. What are the activities on the main thread? Explain why you think the CPU is maxed out?

## Code Review and fixes

Next, look at the (horribly written) code. This is good practice when you are hired in a company and need to support someone else's horribly written code 😁

1. the More Info links are not functional. Fix the code so that they work.
2. Why isn't the sort select menu working? Write a comment in the code indicating what needs to be done.
3. Generally go through the code a perform a code review; every time you see some dodgy code, write a comment about the issue and try to fix it.

## Performance Improvements

Two ways that you can improve performance on an image-heavy site is to resize and optimize the images. We will use a tool called [`sharp-cli`](https://www.npmjs.com/package/sharp-cli).

* the dimension of the images 0.jpg to 27.jpg are much too big for what we need. They can be resized to a max width of 640 px. Why? Because the `grid-template-columns` style in `cards.css` indicates the minimum width is 320 px; anything more that 2 x minimum width can be split into 2 columns on the grid. (FYI, [CSS Grid Layouts](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout) are a simple way to style a section into a grid of columns and rows). Steps to follow:

* rename the existing `images` directory to `images-orig` and create an empty `images` directory
* At home, install [Node.js](https://nodejs.org/en/download/) -- default settings are fine. It is already installed in the labs
* at home and the labs, install [sharp-cli](https://www.npmjs.com/package/sharp-cli): in the command line terminal (GitBash), run `npm install --global sharp-cli`
* in the appropriate directory, in the command line run `sharp resize 640 --optimize -i ./images-orig/*.jpg -o ./images `
  You will see that your `images` folder contains much smaller images!

**ERRATUM**
__NOTE__ If you are in the lab and get an error `bash: sharp: command not found`, the command was not added correctly to your path and you may have to run the command as follows (looking at where sharp was installed):
`C:\\Users\\YOURSTUDENTID\\AppData\\Roaming\\npm\\sharp resize 640 --optimize -i ./images-orig/*.jpg -o ./images `
__NB__ replace _YOURSTUDENTID_ and ensure you escape the slashes


* Run the Lighthouse report again and note any changes in your report.


# Submission

There are steps to be done _both on GitLab and Moodle_.

On git/GitLab:

* Make sure ESLint shows no errors or warnings in your source code.
* Push your `A1` branch to your `520-study-LASTNAME` fork (origin).
* On GitLab, open a Merge Request of `A1` against `main`.
* Set both 520 teachers as reviewers.
* Make sure your teachers are set as Maintainers on `520-study-LASTNAME` (you
  should have already done this in your Week 1 lab exercise about git).

On Moodle, Assignment 1:

* Submit a URL to the _Merge Request_ you created above.

You will receive a grade and feedback on Moodle. Your teacher may also make
comments on your Merge Request. Your official grade will be posted on Lea.