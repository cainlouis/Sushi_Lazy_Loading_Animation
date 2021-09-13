---
title:  'Exercise 4.1 - Using development and external tools to measure performance and find forced synchronous layout problems'
author:
- Jaya Nilakantan
- 420-520-DW
---

This tutorial shows you how to use the external tools once your site is deployed. We will also take a more in-depth look at the Performance Tab in Google Chrome to investigate and fix forced synchronized layout problems in JS code. 

__Read the entire document carefully__

# WebPageTest

You may have noticed that LightHouse scores change; this may be due to browser extensions (including VSCode's LiveServer extension that injects JavaScript), or due to the overall load on your system, since your server is localhost. Once your page is deployed and no longer running locally, you can use test sites like [WebPageTest](https://webpagetest.org/) to run tests, simulating different devices and geographies.

## Using WebPageTest

If you are interested, there is a [short WebPageTest tutorial](https://docs.webpagetest.org/getting-started/) here.

Go to [WebPageTest](https://webpagetest.org/), select the tab Simple Testing, enter the url `https://www.metro.ca/epicerie-en-ligne`, test configuration Mobile-Fast 3G, check Run Lighthouse Audit and start test.

Once the test runs (it will take about 2 or 3 minutes), notice that you can see the summary as well as multiple tabs. Click on the Lighthouse Perf score to see the full LightHouse report.

Open the `metro` link in a new tab, open the dev tools, and start a Lighthouse report, ensuring that you have simulated throttling and that you are looking at mobile.

Compare the webpagetest Lighthouse report metrics with the local Lighthouse metrics; are the numbers similar? Run the webpage test again; are the numbers between the two runs similar?

# Using Performance tools to sectionalize a forced reflow issue

For this part of the lab, we will be following the tutorial for [Chrome Developers](https://developer.chrome.com/docs/devtools/evaluate-performance/) that looks deeper at how to use the Performance Tab to analyse runtime performance. We will be examining the Response, Animation and Idles phases of this [site](https://googlechrome.github.io/devtools-samples/jank/). Follow the instruction in the [tutorial](https://developer.chrome.com/docs/devtools/evaluate-performance/), skipping the Bonus FPS meter tool and the Next steps sections.

