---
title:  'Assignment 2'
author:
- Jaya Nilakantan
- 420-520-DW
---

This is an assignment that can be done either with a __partner__ or __individually__. Your work must not be shared or published.

__Deadline__: see Moodle. In case of _exceptional_ circumstances you may request
an extension by sending a MIO to your teacher. Otherwise, late submissions are 
not accepted.

_Read all the assignment instructions before you begin_.

# Goals

In this assignment, you will write a website demonstrates some of the client-side performance techniques learned so far:

1. use the Fetch API
2. lazy load images using the Intersection Observer API
3. create an animation using `requestAnimationFrame` (rAF)

# References
Images from:

* banner image: https://www.aliexpress.com
* temporary placeholder sushi: https://www.choicemarthawaii.com/
* image to animate: freepik.com
* all images and text from sonic API: https://delishably.com 

# General Requirements

## git and GitLab

### Working with a partner

Send me a Slack DM with the name of your partner by Sept 21st. No partners allowed after that date.

If you are working with a partner, one partner will:
* create a new fork of <https://gitlab.com/dawsoncollege/520JS/2021-08/520-study>
  * Change the name of the fork to `520-study-A2-Name1-Name2`, where `Name1` and `Name2` are the last names of the teammates
    * The namespace should be your personal account (the default)
    * The visibility will be __private__ because the original `520-study` repo
      is private.
* click on __Project Information__ on the left, then __Members__ 
   You need to add your partner **and** your 520 teacher as Maintainers so we have access to
   the private repository.

  * Add `j-nila` and your partner with role __Maintainer__ and click __Invite__
* Use the Protected Branch Workflow in `520-study-A2-Name1-Name2`. 
  * since you are working with a partner, you will create a branch called `A2` **and** your development branches off `A2`
    * create a new branch (from `A2`) for every feature (e.g., branch `animation`)
    * do not make any commits directly in `A2`
  * create Merge Requests from the development branches to **A2** and set the reviewer as your partner
  * Partners **must** perform a code review and give meaningful feedback if there are changes/improvements required. You **both** have responsibility to the quality of the code
  * merge into `A2` when all comments are addressed
  * do **not** make any commits to `main` or merge into `main`
  * when you are ready to submit, you will open an MR to `main` and set your teacher as reviewer.
      * Make sure your Merge Request has a clear title.
      * In the MR description, write down any challenges you faced; explain if there
  are any parts missing in your submission and why.
      * Do __NOT__ merge into main!

### Working alone

Use the Protected Branch Workflow in `520-study-LASTNAME`. 
Since this is an individual assignment, this means:

* Don't make any commits on `main` or merge into `main`.
* Work on a feature branch. To ease grading, __please call your branch `A2`__
* Push `A2` to `origin` regularly to back-up your work.
* do **not** make any commits to `main` or merge into `main`
 * when you are ready to submit, you will open an MR to `main` and set your teacher as reviewer. Do not merge!

See the __Submission__ instructions at the end of this document. You will open
a Merge Request on GitLab. 

* Make sure your Merge Request has a clear title.
* In the MR description, write down any challenges you faced; explain if there
  are any parts missing in your submission and why.
* Do __NOT__ merge into main!

### Commit Style and Code Style

Refer to the instructions in Assignment 1 [A1Spec](https://dawsoncollege.gitlab.io/520JS/2021-08/520-study/assessment/02_assignment1/A1Spec.html)

# Specification

You have been provided starter HTML and CSS that you may modify, in addition to writing your JavaScript file. You will be writing a website that displays a selection of the sushi available at a restaurant. Most text and images that are displayed are not stored locally on your website, but are read from an API hosted on `sonic`. All the sonic images and descriptions are from [Brittany Kennedy at Delishably](https://delishably.com/meat-dishes/The-Different-Kinds-of-Sushi).

## Using the API

 The API endpoints are as follows:

1. https://sonic.dawsoncollege.qc.ca/~jaya/sushi/sushi.php?number=TYPE
Returns the number of sushi in the category, where `TYPE` is either `nigiri` or `maki`. The response is a JSON string like this: 
```js
{
  "count": 5
} 
```

2. https://sonic.dawsoncollege.qc.ca/~jaya/sushi/sushi.php?category=TYPE&num=1

Returns an image and description of a specific sushi, where `TYPE` is either `nigiri` or `maki`, and `num` is a number from 0 to `count - 1` in that category. The response is a JSON string like this, with the URL being the relative URL where the image is found: 
```js
{
  "category": "nigiri",
  "description": "blah blah blah",
  "imageURL": "assets/nigiri/ahi.webp"
} 
```

If there is an issue with the requests (e.g., a type category that does not exist), the API returns an HTTP 404 error.

## Functionality of the website - Sushi examples

Once the DOMContent is loaded, you will be making JavaScript Fetch requests to fill in the content of the page. Use techniques that were discussed in class:

* preconnect to the sonic website
* use the Fetch API to get the information on all the items
* create articles for each item that you will be adding the the appropriate `card-container` section. I reused styles from A1, but feel free to change them as you desire. If you use the existing styles:
  * the articles have the class `card`, and will contain a `figure` with class `card-thumbnail` that contains an `img`
    * set the `data-src` attribute of every image to be the base url `"https://sonic.dawsoncollege.qc.ca/~jaya/sushi/"` plus the `imageURL` returned in the JSON. Set the `src` for all the images to the default image supplied in `assets/sushi.webp` (or you can use your own default image)
  * each article also has a section with a class `card-description` that will contain the `description` returned in the JSON
* if any Fetch requests are rejected/in error, show the error paragraph and write the error to the `console.error`
* lazy load the images using the Intersection Observer API. You don't need to set any options since the defaults are fine. Have one observer observing the `#nigiri` section and another for `#maki`. The callback will change the `src` of all the `img`s in that section to the value of the `data-src` attribute only if the `src` still `endsWith("assets/sushi.webp")` ([endsWith](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith) is a JS string function)
* **Optional for individual projects, required for partner projects**: For smooth scrolling of the navbar links, add event listeners to the click event and use [scrollIntoView](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView) with behaviour `smooth`


## Functionality of the website - Animation

In the animation section: lift up and down the image by 2px every paint cycle (i.e., using `requestAnimationFrame`s), going up and down by a maximum of 100px. Try to avoid work on the main thread as far as possible. The animation never ends!

## Tip

Code features incrementally: first start with the fetch requests, then loading all of one section upon DOMContentLoaded. When you are confident that it works, refactor the code for both sections, trying to reuse as much code as possible. Next, add the IntersectionObserver.

The two big benefits of coding features incrementally is that:

1. you will at least have a functional website even if you cannot complete everything
2. it is easier to debug when you can focus only on 1 feature and fewer lines of code at a time.


# Submission

There are steps to be done _both on GitLab and Moodle_.

On git/GitLab:

* Make sure ESLint shows no errors or warnings in your source code.
* Push your `A2` branch to your `520-study-LASTNAME` fork (origin) or `520-study-A2-Name1-Name2`
* On GitLab, open a Merge Request of `A2` against `main`.
* Set your 520 teacher as reviewer.

On Moodle, Assignment 2:

* Submit a URL to the _Merge Request_ you created above.

You will receive a grade and feedback on Moodle. Your teacher may also make
comments on your Merge Request. Your official grade will be posted on Lea.