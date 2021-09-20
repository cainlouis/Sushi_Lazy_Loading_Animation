---
title:  'Lazy Loading'
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

## Lazy loading

[Lazy loading](https://developer.mozilla.org/en-US/docs/Web/Performance/Lazy_loading) is a strategy to load non-critical resources only when needed

Goal: reduce page load times

## Lazy loading CSS

Recall strategies for non-critical CSS

1. media query

`<link href="portrait.css" rel="stylesheet" media="orientation:portrait">`

---

2. defer non-critical styles
```html
<link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
```
  * `link rel="preload" as="style"` requests the stylesheet asynchronously.
  * The `onload` attribute in the link allows the CSS to be processed when it finishes loading.
  * "nulling" the `onload` handler once it is used helps some browsers avoid re-calling the handler upon switching the `rel` attribute.

## Lazy-loading images

* "non-critical" images usually means "off-screen" or "under-the-fold"

Example [Medium](https://medium.com/)

---

![Medium Example](https://web-dev.imgix.net/image/admin/p5ahQ67QtZ20bgto7Kpy.jpg?auto=format&w=845)

## Why bother?

Loading images that no one sees is wasteful: data, processing time, battery life, cache, ...

Lazy loading reduces initial page load time, page weight, and system resource usage: all positively  impact performance.

[source](https://web.dev/lazy-loading/)

## Browser-level lazy loading

`<img loading="lazy" src="..." />`

* browser decides when it needs to download the image, based on the distance it is from the viewport
* default value of `loading` attribute is `eager`, which loads the image immediately, regardless of the image being in the viewport
* attribute requires JS to be enabled on the browser
* `loading` attribute is not supported by Safari, so you also need a JS workaround 

## Lazy loading with the Intersection Observer

 [`Intersection Observer API`](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API).

* provides a way to asynchronously observe changes in the intersection of a target element with the document's viewport (root)

## Example

See `../examples/05_IntersectionObserver.html`

## Code

```js
//1. register an IntersectionObserver
let observer = new IntersectionObserver(
  //give it the callback function to invoke
  //it takes one parameter, entries, representing
  //the elements being observed by the observer
  function(entries){ 
    //since we are observing 1 section at a time, we use entries[0]
    //if the intersection ratio > 0, we are intersecting
    if (entries[0].intersectionRatio > 0){
      //target is the element being observed
      displayImage(entries[0].target); 
    }
  });
```

---

```js
// start observing
//Can use the same observer for many elements of just one
intersectionObserver.observe(element);
```

## displayImage - Lazy loading

```js
function displayImage(image){
  if (image.src !== image.getAttribute("data-src")){
    image.src = image.getAttribute("data-src");
  }
  //if intersectionObserver is in scope, you could also `unobserve` the image
}
```

* `data-*` attributes are often used for scripting
* the `data-src` attribute is doesn't have a defined meaning, ignored by browser
* we use if to hold the src of the actual larger image

## Responsive images

[Example not responsive](https://mdn.github.io/learning-area/html/multimedia-and-embedding/responsive-images/not-responsive.html)

* view on a mobile device

* An improvement would be to display a cropped version of the image which displays the important details of the image when the site is viewed on a narrow screen: _art direction problem_
* Unnecessary to display large images on small screens _resolution switching problem_

[source](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)

## Solutions

* vector images
  * scale well, small file size
  * hard to get vector image for a photograph
* responsive images - `img` tag
  * offer the browser several image files showing same image in diffferent sized (_resolution switching_)
* responsive images - `picture` tag
  * offer the browser several image files showing different images (_art direction_)

## Responsive Images

>A method for providing the browser with multiple image sources depending on display density, size of the image element in the page, or any number of other factors.

[source](https://cloudfour.com/thinks/responsive-images-101-definitions/)

## Resolution switching with srcset

* the `img` attribute `srcset` gives the browser the choice based on conditions: *resolution switching*
* [`srcset`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/srcset) 
* `srcset` is a string that identifies images to use under _different_ circumstances

## img srcset - width descriptors

![example](https://cloudfour.com/wp-content/uploads/2015/03/srcset-width-descriptors.png)

---

* `srcset` attribute is added to an `<img>` element
* The value of srcset contains a comma-separated list
* Each item in the list contains the path to an image *and* the width of the image source (e.g., 160w, 320w, ...)
* width descriptors give the resolution

## How does the browser pick the best one?

* the browser usually starts downloading images before the critical rendering path is complete
* it downloads *before* knowing what the layout of the page will be.
* the only thing it knows is the size of the viewport
  * use the `sizes` attribute to help the browser choose the correct image!

## `img`, `srcset`, and `sizes`

![Example](https://cloudfour.com/wp-content/uploads/2015/03/sizes-full.png)

--- 

* Like srcset, the [`sizes`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/sizes) attribute contains a comma-separated list
* the `sizes` attribute allows you to specify the the size of the image in relation to the viewport
  * the first value is the media condition
  * the second is the length expressed in *viewport width units* `vw`
    * Each vw unit represents 1% of the viewport width
    * 100vw is 100% of the viewport width
    * 33vw is 33% of the viewport width

## Putting it together

```html
<img src="cat.jpg" alt="cat"
  srcset="cat-160.jpg 160w, cat-320.jpg 320w, cat-640.jpg 640w, cat-1280.jpg 1280w"
  sizes="(max-width: 480px) 100vw, (max-width: 900px) 33vw, 254px">
```
* `srcset` gives the possible images and their widths in pixels
* `sizes` gives the media condition and size of viewport

## How the browser uses these rules

1. Look at its device width.
2. Work out which media condition in the sizes list is the *first* one to be true.
3. Look at the slot size given to that media query.
4. Load the image referenced in the srcset list that has the same size as the slot or, if there isn't one, the *first image that is bigger* than the chosen slot size.

---

[source](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)

e.g.,

If the viewport is 400px wide, it chooses an image to take 100% of the viewport

So it will download `cat-640.jpg`

## Art direction with picture

[Example](https://cloudfour.com/examples/img-currentsrc/)

```html
<picture>
	<source media="(min-width: 650px)" srcset="images/kitten-large.png">
	<source media="(min-width: 465px)" srcset="images/kitten-medium.png">
	<!-- img tag for browsers that do not support picture element -->
	<img src="images/kitten-small.png" alt="a cute kitten" id="picimg">
</picture>
```
* *art direction* change the image for different display sizes
* `<picture>` element is a wrapper with several `source`
* `img` is the default
* media attribute in picture: *art direction* based on size

## Why not use CSS or JS to choose the correct image?

* the browser **preloads** images before the parser has loaded and parsed the CSS and JS (remember the *preload scanner*?)
* this reduces page load time (by around 20%!) but makes it harder to have responsive images