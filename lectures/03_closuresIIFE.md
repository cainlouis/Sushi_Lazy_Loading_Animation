---
title:  'Functions - Closures and IIFE'
author:
- Maja Frydrychowicz, Jaya Nilakantan
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

## Functions are first-class objects in JavaScript

1. they can be the parameters of functions
2. they can be returned as results of functions
3. they can be assigned to a variable in an assignment statement
4. they can be constructed at runtime
5. they have an intrinsic identity (independant of their name) and can be compared for equality

[source](http://skilldrick.co.uk/2011/04/closures-explained-with-javascript/) 

## Function object

In fact, functions are instances of [Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) global objects.


## Check it out yourself!

Try running this in the console:

```js
console.log(typeof(console.log));
console.log( console.log instanceof Object);
console.log( console.log instanceof Function);
```

## Example - function as parameter to a function

We've seen Event Handlers and callbacks. We've also seen
array functions that take functions as arguments

---

```js
function sumOperation (operation, array){
  let transformed = array.map(operation);
  //arrow function -> anonymous, bound to the variable summer
  const summer = (accumulator, item) => accumulator+item;
  return transformed.reduce(summer);
}
//named function, bound to the name createOdd
function createOdd(num){
  return num*2 + 1;
}

const arr = [1,2,3,4];
console.log(sumOperation(createOdd, arr));
```

## Bindings

[Bindings](https://eloquentjavascript.net/02_program_structure.html#h_lnOC+GBEtu) are how JavaScript holds values

Variables are examples of bindings. After a binding has been defined, its name can be used as an expression.

Named functions are also examples of bindings.

## Review - bindings and scope

Each binding has a scope - the parts of the program where the binding is visible. This will apply to functions as well.

* global
* local
  * each time the function is called, new instances of these bindings are created
* block
  * each time the block is run, new instances of these bindings are created

## More about functions

```js
// assign an anonymous function expression to doSomething
const doSomething = function () {
  //...
}
// call doSomething
doSomething();

// another example: assign the doSomething function to the
// window.onload event handler property
window.onload = doSomething;

// note the difference: this assigns the return value
// of doSomething to window.onload
window.onload = doSomething();
```


## Function returning a function - 1

```js
function display() {
  return console.log;
}
//display must be invoked to get the returned function
let myDisplay = display();
myDisplay("hi!");

```

## Function returning a function - 2

```js
function display() {
  const greeting = "hey there!";
  return (message) => console.log(greeting+" "+message);
}
//display must be invoked to get the returned function
let myDisplay = display();
myDisplay("hi!");
```

## Closure

`display` runs to completion.

What happens to the local bindings it contained? The captured variable `greeting` gets recreated every time the returned function is invoked, so different calls **don't share** the same captured variable.

A *closure* is the combination of a function and the lexical environment within which that function was declared. In this example, the arrow function is a closure.

## Function returning a function - 3

```js
function multiplierPlusOne(factor) {
  factor = factor+1;
  return function(n) {
    return n * factor;
  };
}

let triple = multiplierPlusOne(2);
console.log(triple(5));

let quad = multiplierPlusOne(4);
console.log(quad(1));

console.log(quad(1));
```

---

```js
function multiplierPlusOne(factor) {
  factor = factor+1;
  return function(n) {
    return n * factor;
  };
}
let triple = multiplierPlusOne(2);
// prints  15
console.log(triple(5));
let quad = multiplierPlusOne(4);
// quad(1) returns 5;
console.log(quad(1));
// the captured variable factor will be recreated, so again returns 5
console.log(quad(1));
```

## Warning: captured local variable values
The captured value that is used is the value when outer function returns, *not* the value at the time the closure is defined. Avoid changing local variables after defining a closure that uses them!

---

```js
function badMultiplier(factor) {
  let f = (n) => n * factor;
  // ah, watch out!
  factor = 5;
  return f;
}
let triple = badMultiplier(3);
console.log(triple(4));
// prints  20 instead of 12, because the final value of factor is 5
```

## Warning 2
A closure can change its captured variables' values.

```js
function getCounter () {
  let count = 0;
  return function () {
    count += 1;
    return count;
  }
}
let x = getCounter();

console.log(x()); //1
//2 since x's captured count was incremented
console.log(x());

let y = getCounter();
//1 since y has its own captured count variable
console.log(y());
```

## Immediately Invoked Function Expression (IIFE)

An [IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) (pronounced *iffy*) is an anonymous function that is executed as soon as it is defined.

The function is defined within `()` parentheses.

The function is immediately invoked with `()` after it is defined 

---

```js
(function () {
  statements
})();
```

## Why use one?

A common use of IIFE is to limit the number of global bindings

* less risk of name collision with other scripts
* organize your code

## Example - IIFE to encapsulate

```js
(function () {
  // all variables and functions defined here
  // are available in this IIFE scope only
  function printEvent(e) {
    e.preventDefault();
    console.log("The event was a click.");
  }

  document.addEventListener("DOMContentLoaded", function () {
    // initialization
    let links = document.getElementsByTagName("a");
    for (let i = 0; i < words.length; i++) {
      links[i].addEventListener("click", printEvent);
    }
  });

})();
```


## Example - Module pattern
A way to enforce data privacy in JavaScript...
```js
const module = (function () {
	//scoped within IIFE only
  let privateVariable = 1;
	function privateMethod() {
		// ...
	}
  //place public items in an object externally available
  return {
	  moduleProperty: 1,
    //functions retain access to private variables
	  moduleMethod: function () {
		  // ...
	  }
  };
})();
//can use module or export it to share with other scripts:
module.moduleMethod();
```

## IIFE for data privacy
[source](https://addyosmani.com/resources/essentialjsdesignpatterns/book/)

 ```js
let basketModule = (function () {
 
  // privates
  let basket = [];
  function doSomethingPrivate() {
    //...
  }
  function doSomethingElsePrivate() {
    //...
  }
 
  // Return an object exposed to the public
  return {
    // Add items to our basket
    addItem: function( values ) {
      basket.push(values);
    },
    // Get the count of items in the basket
    getItemCount: function () {
      return basket.length;
    },
    // public alias to a private function
    doSomething: doSomethingPrivate,
    // Get the total value of items in the basket
    getTotal: function () {
      let q = this.getItemCount();
      let p = 0;
      while (q--) {  //do you remember how postfix decrement works?
        p += basket[q].price;
      }
      return p;
    }
  };
})();
```
## Example: loop index
Consider the [code](https://javascript.plainenglish.io/4-practical-use-cases-for-iifes-in-javascript-6481dcb0ba7d):
```js
for (let i = 0; i < 3; i++) {
  setTimeout( () => console.log(`${i}`), 100);
}
```
What is the result (on separate lines)?

1. 0 1 2
2. 2 2 2
3. 3 3 3
4. 1 2 3
5. I don't know

## IIFE in loop index
```js
for (let i = 0; i < 3; i++) {
  (function(index) {
    setTimeout( () => console.log(`${index}`), 100);
  })(i);
}
```

## IIFE with async
```js
(async () => {
  //invoke an async function
  const response = await getWeather("Montreal");
  displayWeather(response);
  ...
})();
```
Benefits:

- no need to have a named `async` function
- define and immediately execute an `async` function
- useful if you have additional data to load on DOMContentLoaded, and need to use the `await` operator
- [performance improvement](https://thomasstep.com/blog/converting-to-asynchronous-code-using-iife) possible
