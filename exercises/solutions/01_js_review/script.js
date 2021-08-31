"use strict";

document.addEventListener("DOMContentLoaded", init);
let clicks = 0;
let randImage = "";

function init() {
  const image = document.getElementById("image");
  const labra = document.getElementById("labra");
  labra.checked = false;
  const chicken = document.getElementById("chicken");
  chicken.checked = false;
  if (Math.floor(Math.random() * 2) === 0) {
    //Another way: image.setAttribute("style", "background: url(./labradoodle.PNG)");
    image.style.background = "url(./labradoodle.PNG)";
    randImage = "labra";
  } else {
    // image.setAttribute("style", "background:url(./fried-chicken.PNG)");
    image.style.background = "url(./fried-chicken.PNG)";
    randImage = "chicken";
  }

  for (let i = 0; i < 100; i++) {
    let div = document.createElement("div");
    let rand = Math.floor(Math.random() * 3);
    if (rand === 0) {
      div.className = "red";
    } else if (rand === 1) {
      div.className = "blue";
    } else {
      div.className = "white";
    }
    image.appendChild(div);
  }

  image.addEventListener("click", handleClick);
  labra.addEventListener("click", btnSelected);
  chicken.addEventListener("click", btnSelected);
}

function handleClick(e) {
  let clicked = e.target;
  if (clicked.localName === "div") {
    if (clicked.className !== "cleared") {
      clicked.className = "cleared";
      clicks++;
      let h3 = document.querySelector("h3");
      h3.textContent = "You have used " + clicks + " clicks";
    }
  }
}

function btnSelected(e) {
  let selectedValue = e.target.value;
  let message = "";
  if (selectedValue === randImage) {
    message = "You Win in " + clicks + " moves!!";
  } else {
    message = "You lost!!";
  }
  setTimeout(() => displayMessage(message), 1000);
}

function displayMessage(msg) {
  let h3 = document.querySelector("h3");
  h3.textContent = msg;
}