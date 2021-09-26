---
title:  'Modules'
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

## Demo - Lazy loading images

[Demo](https://mathiasbynens.be/demo/img-loading-lazy)

## Modules

* We’ve been writing all our code in a single file until now. 
* But there are good reasons to break up code into smaller files
  * take advantage of browser caching
  * reuse of functions/classes
  * avoid everything in the global namespace
* Solution = modules!
  * a way to split up JavaScript programs into separate pieces that can be imported when needed

---

![modules](https://miro.medium.com/max/400/1*CvBf842SaDHJvjUqgZIWAg.png)

## Different JavaScript module formats

* CommonJS (CJS)
  * one of the first formats, used initially be NodeJS
  * `require` and `exports` keywords

---

```js
// utils.cjs
// we create a function 
function double(num){
  return 2*num;
}
// export (expose) add to other modules
module.exports.double = double;

// module.exports is an object that is exported


// index.cjs
 const utils = require('./utils.cjs');  //contains the exported object
 utils.double(4); // = 8
```

---

* the `require` function fetches dependancies
* this is a *synchronous call* (notice that there is no callback)
* what issues can this cause in the browser?

---

CommonJS is not used in the browser but was and is used on the server.

We will revisit with node.js

Often uses the file extension `.cjs`

## Asynchronous Module Definition (AMD)

* API definition, RequireJS is an implementation of the API
* generally used in the browser environment since it is async
* out of scope for this course

## ESM - ECMAScript Modules

* ES6 standard module system
* only one documented in [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
* `import` and `export` keywords

---

```js
// utils.mjs
// we create and export a function 
export function double(num){
  return 2*num;
}


// index.mjs
import double from './utils.mjs'; 
double(4); // = 8
```
* often uses the file extension `.mjs`
* see [link](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules#aside_%E2%80%94_.mjs_versus_.js)

## `export`

* `export` makes a top-level (i.e. global scope) function, class or variable available
* can export multiple bindings individually

```js
export const name = 'square';
export function draw(length, x, y, color) {
    //code here
}
```

---

* or as a single object at the end

```js
export {name, draw };
```

* modules "use strict" mode automatically

## `import`


* `import` allows you to use features exported in another script

```js
import {name, draw } from './modules/square.mjs';
```

---

* Once a feature is imported, you can use them like they were defined locally **except** they are:
  * read-only (cannot change their values) 
  * imported into the scope of this script only: not accessible in the console, for example

## HTML changes

* the JS script refers to which file it needs, so your HTML doesn’t need more script tags
* but you need to refer to the main js script as a module
  * you can *only* use export and import statements inside modules
* modules are deferred by default

```html
<script type="module" src="main.mjs"></script>
```

---

Aside: Your HTML code can reference multiple JS files.

```html
<script src="https://www.google-analytics.com/analytics.js" async></script>
<script src="https://code.jquery.com/jquery-3.6.0.js" integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk=" crossorigin="anonymous" async></script>
```

* they don't have to be modules
* Each file has its own global scope.

## eslint changes

* eslint will not allow you to use CJS or ESM keywords unless you add a `parserOption` that your `sourceType` is a `module`.
* I added an override for `.mjs` and `.cjs` files. Resync your `520-study` fork!

---

* the path for the `import` is relative to the *site’s root*, not where the importing script is located
* a relative path always requires a leading `./` or `../`
* an absolute path requires a full URL (e.g., file:///)
* you can also import *packages*
  * a package manager is a system that manages your package dependancies

## Module aliases

* You can rename features in the export or import statements

```js
import { name as squareName,
         draw as drawSquare} from './modules/square.mjs';
```
or
```js
export { name as squareName,
         draw as drawSquare};
```

## Avoiding name collisions

* `name` and `draw` are common words, it is possible that they are used in other modules, not just in `square.mjs`
* instead of declaring aliases, we can put the imported features in a Module -> like a namespace
* use a wildcard to get all exported features

```js
import * as Square from './modules/square.mjs';
```
* `Square.name` and `Square.draw` are now available

## Examples

See [MDN Examples](https://github.com/mdn/js-examples/tree/master/modules)

## Dependancies and Packages

[Source: MDN](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools/Package_management)

* a dependency is a third-party bit of software that was probably written by someone else and ideally solves a single problem for you
  * eslint
  * React
* your dependencies may have their own dependencies
* it can get complicated to keep track of all the files that you need

---

![React](https://pics.me.me/thomas-fuchs-thomasfuchs-follow-legendary-apollo-project-programmer-margaret-hamilton-47268022.png)

---

![black hole](https://pics.me.me/things-that-have-no-end-pi-space-47-233-5-6-62020207.png)

---

![yo mama](https://pics.me.me/yomama-so-fat-even-node-modules-is-smaller-than-her-62168038.png)

---

![backpack](https://pics.me.me/e-rite-simple-page-2-gb-node-modules-the-time-41829238.png)

## Package manager

* a package manager:
  * provides a method to install new dependencies (also referred to as "packages")
  * manage where packages are stored on your file system
  * offer capabilities for you to publish your own packages

---

* Finding all the correct package JavaScript files.
* Checking them to make sure they don't have any known vulnerabilities.
* Downloading them and putting them in the correct locations in your project.
* Writing the code to include the package(s) in your application (using JavaScript modules).
* Doing the same thing for all of the packages' sub-dependencies, of which there could be tens, or hundreds.
* Removing all the files again if you want to remove the packages.

## Global vs local install

* dependencies can be installed globally or locally to your project
  * global can be accessed by any project, so only need to install once: eslint, sharp-cli
  * local allows each project to have its own version, and allows each project to be portable - it has all its dependancies: specific project-realted dependancies

## npm (and yarn)

* leading package managers
* require a *package registry*
  * central place where packages are published
  * npm registry at npmjs.com

## npm steps

* `npm init` launches questions to create a default `package.json` file. 
  * `package.json` is a config file that defines your package

---

* `npm install package_name` will install the package and update the `package.json` with a dependancy
  * if you move your code base to a different machine and run `npm install` it will read the `package.json` file and install all your dependancies
  * local dependancies are installed by default in a folder called `node_modules`
  * `.gitignore` will not version control this folder since it is reproduceable through the `package.json`

---

![.gitignore](https://pics.me.me/git-node-modules-git-gitignore-b0-you-have-over-5000-changes-59033112.png)
