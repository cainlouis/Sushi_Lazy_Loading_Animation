---
title:  'Critical Rendering Path'
author:
- Maja Frydrychowicz, Jaya Nilakantan
- 420-520-DW
revealjs-url: revealjs
---

<style>
  ol li {
    list-style-type: lower-alpha
  } 
</style>

## How the Browser works

* Network communication setup:
  * Mobile handshake, TCP handshake
  * DNS look-up
  * TLS negotiation

---

* HTTP GET Request sent
* HTTP GET Response received
  * message header has important information, such as the content-type
  * message body contains the html file
  * Time to first byte measures time until first packet received
  * the response may need multiple TCP packets
  * TCP slow start - first response packet is 14kb
    * each subsequent packet is doubled until reach threshold/congestion

## Critical Rendering Path

As soon as the first packet of the HTML file is received, the browser starts parsing the HTML, and building the DOM. 

DOM construction is incremental.

---

The browser initiates a network request when it finds a link to an external resource (css, js, images, fonts, ...). 

The **preload scanner** will in fact request  high priority resources *before* the HTML parser reaches them. So a script linked at the end of the file will be downloaded earlier. 

::: notes

Some resource requests are blocking = HTML parsing stops while the response is handled

:::

## DOM

![picture of DOM](img/2-DOM.png) [source](https://medium.com/jspoint/how-the-browser-renders-a-web-page-dom-cssom-and-rendering-df10531c9969)

## DOM and CSSOM

Once the DOM is complete (i.e., html parsed), the CSSOM is constructed. 

The CSSOM *cannot* be constructed incrementally, because styles can overwrite each other. 

---

CSS is render-blocking: nothing is rendered until *all* the CSS is parsed and the CSSOM is complete. 

---

More specific rules (i.e., `section div.warning`) are less performant when creating the CSSOM than less specific (`section`).

The more selectors, the longer to traverse the DOM to create the CSSOM.

## CSSOM

![picture of CSSOM](img/2-CSSOM.png) [source](https://medium.com/jspoint/how-the-browser-renders-a-web-page-dom-cssom-and-rendering-df10531c9969)

## JavaScript compilation

While CSS is being parsed, JavaScript is interpreted and compiled. 

Yes, JavaScript is compiled! 

For faster code execution, byte code is used; compilation is done by the browser's JavaScript engine (e.g., `V8` in Chrome, `SpiderMonkey` in Firefox)

## Style Computation

Once CSSOM is ready, the DOM and CSSOM are combined into the Render Tree, or Computed Style tree, for all visible content (e.g., no head, no nodes with style `display:none`).

*Rendering* is the overall process to go from DOM and CSSOM to drawing on the screen, and includes the Style, Layout, Paint and Composite steps.

---

Updating the Render Tree, or Style, has to be done every time an element is added to the DOM, or styles of an element are changed by JavaScript.

## Layout

Layout is placing the nodes based on the screen size and resolution. The Layout step determines the positioning of nodes with respect to the viewport based on their height, width and other geometry. 

---

The `<meta name="viewport" content="width=device-width">` tag will set the width to the actual device instead of the default 960px. 

---

The Layout step happens every time the placement needs to be recalculated. 

The more nodes that move, the longer it takes. 

---

Repeated **Layout** recalculations during animations can cause *jank* (under 60FPS responsiveness). 

*Reflow* refers to the Layout, Paint and Composite steps being repeated.

## Paint and Composite

The **Paint** step paints the pixels. Initially, the entire screen is painted, but after that only impacted areas are repainted. 

**Compositing** ensures that the layers are drawn in the correct order.

## Match the following

Indicate if these cause Layout to be redone or not.

1. Change a style of an element to `display:none`
2. Add an advertising header once the main content has loaded ([example](https://www.lapresse.ca/))
3. Change the background colour of a node
4. Change the border width of a node
5. Change the style of an element to `visibility:hidden`
6. Change a rule from `p { width: 500px }` to `section .someclass { width: 500px }`

## Answers

1. yes, layout needs to be redone since an element is removed from the document layout
2. yes, the advertising header will move everything below, causing layout to be recalculated. If the banner moves in and out in an animation, it will cause reflow and may result in jank.
3. No, this requires Paint, but no layout
4. yes, the width impacts the space taken by the node
5. `visibility` shows or hides an element without changing the layout, so the layout step is not done
6. Layout will be redone - the CSSOM changed so Layout will be redone

## Reflow

A layout change means that the placement needs to be recalculated for all elements that are affected.

Styles causing layout changes include: width, position, margin, etc...

The browser has to check the impact on other elements.

Any affected area is repainted and final painted elements are composited back together

## Paint-Composite only changes

Some style changes don't cause Layout to be recalculated, for example, color or background.

In this case, the affected areas are repainted and the final painted elements are composited back together.

## Impact of styles

[This site](https://csstriggers.com/) indicates which styles cause layout, paint, and/or composite changes.

## Demo: Development Tools

Example site: 
https://binaryville.com
[Source](https://www.linkedin.com/learning/developing-for-web-performance/how-do-we-measure-performance)

* Chrome Dev Tools
  * Open in incognito mode
  * Disable cache for first time user
  * Disable browser extensions

---

* Network tab
  * waterfall - queuing, waiting, download
  * gap between 1st set and second
    * check the  initiator
  * blue line and red line in overview -> legend at the bottom (DOMContentLoaded and Load)
  * Compare with 3G Throttling

---

* Lighthouse report for mobile
  * settings: simulate throttling, clear storage
  * Detach web tools (ellipses) so viewport is normal size
  * Core Vital metrics
    * see the descriptions

---

* Performance tab

## Google's Core Web Vitals

* Largest Contentful Paint (LCP)
* First Input Delay (FID) 
* Cumulative Layout Shift (CLS)

