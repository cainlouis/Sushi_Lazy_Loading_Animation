"use strict";

document.addEventListener("DOMContentLoaded", setup);
let global = [];

function setup() {
  global.container = document.querySelector(".card-container");
  getCount();
}

async function fetchApi(url) {
  let response = await fetch(url); 
  if (response.ok) {
    console.log("Status code : " + response.status);
    return response.json();
  } else {
    throw new Error("Status code: " + response.status);
  }
}

async function getCount() {
  try {
    let urlMaki = "https://sonic.dawsoncollege.qc.ca/~jaya/sushi/sushi.php?number=" + "maki";
    global.countMaki = await fetchApi(urlMaki);
    console.log(global.countMaki);
    let urlNigiri = "https://sonic.dawsoncollege.qc.ca/~jaya/sushi/sushi.php?number=" + "nigiri";
    global.countNigiri = await fetchApi(urlNigiri);
    console.log(global.countNigiri);
  } catch(err) {
    treatError(err);
  }
}

function treatError(err) {
  let errPara = document.querySelector("#error");
  errPara.style.visibility = "visible";
  console.error(err);
}

