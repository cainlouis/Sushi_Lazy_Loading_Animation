"use strict";

document.addEventListener("DOMContentLoaded", setup);
let global = [];

function setup() {
  global.startUrl = "https://sonic.dawsoncollege.qc.ca/~jaya/sushi/sushi.php?";
  global.imgBaseUrl = "https://sonic.dawsoncollege.qc.ca/~jaya/sushi/";
  global.container = document.querySelector(".card-container");
  getCount();
}

//fetch the json from the url in input
async function fetchApi(url) {
  let response = await fetch(url); 
  if (response.ok) {
    console.log("Status code : " + response.status);
    return response.json();
  } else {
    throw new Error("Status code: " + response.status);
  }
}

//get the number of sushi for both sushi type
async function getCount() {
  try {
    //Construct the url to get the count
    let urlMaki = global.startUrl + "number=maki";
    //fetch the count
    let makiCountJson = await fetchApi(urlMaki);
    //assign the number of count to global variable
    global.countMaki = makiCountJson.count;
    let urlNigiri = global.startUrl + "number=nigiri";
    let nigiriCountJson = await fetchApi(urlNigiri);
    global.countNigiri = nigiriCountJson.count;
    getSection();
  } catch(err) {
    treatError(err);
  }
}

function treatError(err) {
  //change the visibility of the error paragraph 
  let errPara = document.querySelector("#error");
  errPara.style.visibility = "visible";
  //write to the console the error
  console.error(err);
}

async function getSection() {
  //select the section for maki
  let parentMaki = document.querySelector("#maki");
  //get the card-container inside the section 
  let makiContainer = parentMaki.querySelector(".card-container");

  let parentNigiri = document.querySelector("#nigiri");
  let nigiriContainer = parentNigiri.querySelector(".card-container");
  //call get content for both sushi type
  getContent(global.countMaki, "maki", makiContainer);
  getContent(global.countNigiri, "nigiri", nigiriContainer);
}

//get the content of the url built and add it to the container received as input
async function getContent(count, value, container)
{
  //for the number of sushi for the section(value)
  for (let i = 0; i < count; i++) {
    try {
      //build the url for that sushi
      let endUrl = `category=${value}&num= + ${i}`;
      let fullUrl = global.startUrl + endUrl;
      //fetch the json from the built url
      let json = await fetchApi(fullUrl);
      //create article from the json received
      let article = createArticle(json);
      //append the article to the container
      container.appendChild(article);
    } catch (err) {
      treatError(err);
    }
  }
}

function createArticle(json) {
  //create all element and their attributes/class
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
  //return the article
  return article;
}