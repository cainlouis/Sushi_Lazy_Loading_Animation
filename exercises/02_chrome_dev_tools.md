---
title:  'Exercise 2.2 - Working with Chrome Dev Tools'
author:
- Maja Frydrychowicz, Jaya Nilakantan
- 420-520-DW
---

This tutorial gives an overview of the tools that we will be using through this course. Dev Tools are important tools in a front-end web developers toolbelt; ideally everytime you run your JavaScript though VSCode Live Server, you will also open the Dev Tools. The [dev tools](https://developer.chrome.com/docs/devtools/) documentation is a good place to keep up-to-date with the latest changes in these tools. Firefox and Edge have similar tools, so you can investigate these on your own.

__Read the entire document carefully__

# Overview of Dev Tools

## Opening Chrome Dev Tools

There are many different ways, here are some options:

1. F12
2. Control-shift-I
3. Right-click > Inspect
4. 3 ellipses at the top right > More tools > Developer tools

Depending on what you are doing, you may want to dock the tools at the bottom of the browser window, or detach. Detaching is important when taking measurement that vary based on the viewport size. Docking options are found by the 3 ellipses of the dev tools.

When you are measuring performance metrics, it is better to run the dev tools in an incognito window with no browser extensions that can impact results.

## Elements tab

Within this tab, you can see the HTML element hierarchy. To the right, you see the styles, including styles that are overwritten due to cascading rules. You can edit the elements and styles to see what things look like.
Notice the Event Listeners tab to the right, which shows you the events which are being listened for; if you add event listeners in functions that have not run yet, they will not show in this list until they are attached.

## Console

The console is where error messages are printed; it is also a good place to run quick JS tests.

## Sources

This tab is where you will debug your client-side JavaScript code. To the left, you see the files which were downloaded for the site. When you select a js file, you can click to the left of the line number to set a breakpoint. When the code pauses, you are able to see the values of the variables in scope, as well as global variables, by hovering over the variable, or looking at the scope panel to the right. The call stack tells you how many functions have been invoked. The fetch/XHR breakpoint panel allows you to pause upon a network request. You can also decide to add breakpoints based on various events.

## Network

The [network log](https://developer.chrome.com/docs/devtools/network/) shows how fast and the order in which files are being downloaded. We typically disable cache to see the experience of a first-time user. You can also throttle, to simulate a user on a less performant network.

The network log has interesting columns:
* status shows the http response code
* type shows the resource type (e.g., document for HTML, stylesheet, script, ...)
* initiator shows who requested the file
* the waterfall chart shows you how many files and how long it took to download them; hover over any bar, and you will see the timing for each phase. 

If you right-click on one of the column headers, you can add the *protocol* column: this tells you if the protocol used was HTTP/2 (`h2`) or HTTP/1.1 (`http/1.1`) for each request-response. HTTP/2 is able to use a single TCP connection to send multiple streams, and uses advanced header compression, making it faster.

At the bottom and in the waterfall, you see two metrics - time to DOMContentLoaded in blue and time to Load in red. 

If you click on a file name, you can look at the http headers; this is often important in debugging Fetch requests, as you will see both the http request parameters as well as the response.

## Performance

The Performance tab is the most complicated to understand, as it covers a lot of data. There is a lot of information here! Bookmark this [reference page](https://developer.chrome.com/docs/devtools/evaluate-performance/reference/). This [tutorial](https://developer.chrome.com/docs/devtools/evaluate-performance/) is also interesting, it gives a good demo of jank.

If you are working with this tab, you should detach the dev tools and work in incognito mode with no browser extensions. If you want to simulate a slower device, click the Capture Settings cog <img src="img/cog.png"/> to the right and throttle the network and CPU as desired.

Check the Screenshots checkbox to see how the page builds over time. But profiling can take a long time; a good way to make it faster, depending on your goal, is to uncheck screenshots and Disable JavaScript Samples.

If you click the reload button, you will measure performance of page load, while if you hit the record button, you can measure performance related to a specific interaction or animation. Note that you should wait a few seconds then click stop to end the recordings.

When you get the results, you get **a lot** of data. 

The top charts show you Frames per Seconds (FPS) in green, CPU usage (colour-coded based on what the CPU was busy with) and Network traffic. The CPU chart colour-coding is explained in the Summary tab at the bottom. If you hover your mouse over these charts, you will see a screenshot of what the page looked like at that moment; so if you move your mouse from left to right, you can reenact the progression of the page. You can use the mouse wheel, wasd keys or draf the focus range in the timeline to zoom in/out or pan right/left.

Tip: you can save the profile as a json file with the Downward arrow in the Performance menu bar, and load a profile with the upward arrow. This can be useful for comparing profiles, to see if any changes you are making have an impact.

Below the screenshots, you have a Frames sections; as you hover over, you can see if frames were dropped.

The Main section shows you what the main thread was doing. You can zoom in to better see and understand. Each bar represents an event, with the bars below showing events caused by the bar below.

Finally, the Summary tab at the bottom shows how much times was spent Loading, Scripting, Rendering and Painting.

## Memory
The memory tab has advanced debugging that lets you look at how the heap (area of memory that holds objects) is used over time. We won't be using this tool in this course: but it is very useful in tracking memory issues.

## Application

This tab is useful for seeing the status of local or session storage, cookies, and other more advanced client-side storage.

## Security

Gives an overview of security of the page (e.g., is https used for all resources of the page).

## Lighthouse

[Lighthouse](https://developers.google.com/web/tools/lighthouse/#devtools) generates performance reports that can quickly indicate if there are concerns with some of the important performance metrics. 

Check Clear storage and Simulated throttling, Performance, Best Practices and Mobile, and generate the report. The report is colour coded and indicates some of the issues that were found and suggestions for improvements. Cool!

# Teacher demo

Demo using https://binaryville.com. [Source of this example website](https://www.linkedin.com/learning/developing-for-web-performance/how-do-we-measure-performance
)

# Your turn!

Use the dev tools to examine this site and answer the questions below in *italics*.
https://udacity.github.io/news-aggregator/
which is used in this [Udacity course](https://classroom.udacity.com/courses/ud860). Make sure that you open an incognito window first, open the dev tools, then navigate to the site.

1. In the Sources tab, add a breakpoint for any XHR or fetch (leave the URL blank). Scroll down the page until you hit this breakpoint. The `data.js` source file should open (if it doesn't you can try this question in Firefox Dev Tools).

*What is the url that is being queried by the request function?*

Jump to answer[^url]

[^url]: `https://hacker-news.firebaseio.com/v0/item/28347141.json`


2. uncheck the `Any XHR or fetch` breakpoint, and press the play button to resume the script.

3. Go to the network tab. Yikes! Set throtlling at Slow 3G, disable cache, and refresh the page.

*How long did it take for the first document to complete download? How much time was spent waiting for the first byte (TTFB)?*

Jump to answer[^ttfb]

[^ttfb]: Time column shows download time (When I ran it, `news-aggregator` took 2.03 s). Hover over the waterfall bar for TTFB (also 2.03 s) (or click on news-aggregator and then the Timing tab). If you
don't see `news-aggregator` anywhere, make sure "All" is selected at the top with the filters.

*How long for DOMContentLoaded and Load events?*

Jump to answer[^events]

[^events]: Found at the bottom of network tab, 7.09 s and 9.20 s respectively is what I got

*What resource type is downloaded using HTTP/1.1?* (Right-click on the table 
columns and check Protocol if you don't see it.)

Jump to answer[^http]

[^http]: xhr

*Click on the first XHR request. What does the response look like?*

Jump to answer[^xhr]

[^xhr]: Array of numbers. To see this, click on an XHR line in the table, then Response tab.

4. Go to the Lighthouse tab, and generate a report for Performace on Mobile. Clear Store and Simulated Throttling should be checked. Note that you may get different results depending on the size/dimensions of the browser window (a.k.a the viewport). 

*Which metrics are problematic?*

Jump to answer[^metrics]

[^metrics]: Time to interactive, Speed index, and Largest contentful paint (your results may differ)

5. Since our site is performing so poorly, go to the Performance tab to get more insight. Screenshots should be checked. Click the reload button (or hit Ctrl+Shift+E) in the dev tool to start recording, and stop after about 5 seconds (clear and try again if you don't have enough data). Use you mouse wheel and/or wasd buttons to zoom in/out and pan. 

*Find an area in the timeline where frames were dropped (red in FPS). What was going on in the main thread at that time?*

Jump to answer[^busy]

[^busy]: Your answer may be different depending on where in the flame chart you zoomed in. In the timeline where I looked, there was a lot of rendering, with the Layout warnings about forced reflow.

