"use strict";

document.addEventListener("DOMContentLoaded", setup);
let global = [];

function setup() {
  global.startUrl = "https://sonic.dawsoncollege.qc.ca/~jaya/sushi/sushi.php?";
  global.imgBaseUrl = "https://sonic.dawsoncollege.qc.ca/~jaya/sushi/";
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
    let urlMaki = global.startUrl + "number=maki";
    let makiCountJson = await fetchApi(urlMaki);
    global.countMaki = makiCountJson.count; 
    console.log(global.countMaki);
    let urlNigiri = global.startUrl + "number=nigiri";
    let nigiriCountJson = await fetchApi(urlNigiri);
    global.countNigiri = nigiriCountJson.count;
    console.log(global.countNigiri);
    getContent();
  } catch(err) {
    treatError(err);
  }
}

function treatError(err) {
  let errPara = document.querySelector("#error");
  errPara.style.visibility = "visible";
  console.error(err);
}

async function getContent() {
  let parentMaki = document.querySelector("#maki");
  let makiContainer = parentMaki.querySelector(".card-container");
  //let parentNigiri = document.querySelector(".nigiri");
  //let nigiriContainer = parentNigiri.querySelector(".card-container");
  for (let i = 0; i < global.countMaki; i++) {
    try {
      let endUrl = "category=maki&num=" + i;
      let fullUrl = global.startUrl + endUrl;
      let makiJson = await fetchApi(fullUrl);
      let article = createArticle(makiJson);
      makiContainer.appendChild(article);
    } catch (err) {
      treatError(err);
    }
  }
}

function createArticle(json) {
  let article = document.createElement("article");
  article.classList.add("card");

  let figure = document.createElement("figure");
  figure.classList.add("card-thumbnail");

  let img = document.createElement("img");
  img.setAttribute("src", "assets/sushi.webp");
  img.setAttribute("data-src", global.imgBaseUrl + json.imageURL);

  let section = document.createElement("section");
  section.classList.add("card-description");

  let p = document.createElement("p");
  p.innerHTML = json.description;

  //appending each element to its parent element
  figure.appendChild(img);
  article.appendChild(figure);
  section.appendChild(p);
  article.appendChild(section);

  return article;
}