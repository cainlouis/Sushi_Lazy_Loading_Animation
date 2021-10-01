"use strict";

document.addEventListener("DOMContentLoaded", setup);
let global = [];

function setup() {
  global.startUrl = "https://sonic.dawsoncollege.qc.ca/~jaya/sushi/sushi.php?";
  global.imgBaseUrl = "https://sonic.dawsoncollege.qc.ca/~jaya/sushi/";
  global.container = document.querySelector(".card-container");

  //set the height of the animation section to be constant
  let imgAnimate = document.querySelector("#imgAnimate");
  imgAnimate.onload = function(){
    let imgAnimate = document.querySelector("#imgAnimate");
    let imgH = imgAnimate.height;
    let sectionOfImg = document.querySelector("#animation");
    sectionOfImg.style.height = imgH  + 150 + "px";
  }
  //event handelers for smooth scrolling
  let menu = document.querySelector("#navbar");
  menu.addEventListener("click", smothScroll);

  (async function(){
    await getCount();
    setupIntersectionObesrver("#nigiri"); 
  })();
  
}
//setup one intersection observer
function setupIntersectionObesrver(sectionId){
  //setup observer
  let observer = getObserver()
  //get images
  let section = document.querySelector(sectionId);
  let cardContainer = section.querySelector(".card-container");
  let images = cardContainer.querySelectorAll("img");
  //add images to the observer
  console.log(cardContainer.children);
  for(let img in images){
    console.log(img);
    observer.observe(img);
  }
}
//chnage source for card images
function displayImage(image){
  if (image.src.endWith("assets/sushi.webp") ){
    image.src = image.getAttribute("data-src");
  }
}
//function that makes the observer
function getObserver(){
  return new IntersectionObserver( function(entries){ 
    console.log("before loop in oberver");
    for(let e in entries){
      if (e.intersectionRatio > 0){
        console.log(img);
        displayImage(e.target);
      }
    }
  });
}


//function for smooth scrolling
function smothScroll(evt){
  //prevent default and get the link
  evt.preventDefault();
  let a = evt.target;
  if(a.tagName === "A"){
    //get elem to go to
    let sectionId = a.href.split("#")[1];
    let elem = document.querySelector("#" + sectionId);
    //smooth scroll
    let options = {behavior:"smooth", block: "start", inline: "nearest"}
    elem.scrollIntoView(options);
  }
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

//create iife so that the animation get called directly on the parsing of the js
(function () {
  //get the img to animate 
  var imgAnimate = document.querySelector("#imgAnimate");
  var offset = 0;
  var reverse = false;
  //request the animation
  requestAnimationFrame(animate); 
  
  function animate() {
    //translate the img according to the offset
    imgAnimate.style.transform = "translateY(" + offset + "px)";
    //As they have to move within 100px if offset equals 100
    if (offset >= 100) {
      reverse = true;
    }
    //if it equals 0 and thus respect the range 
    if (offset <= 0) {
      reverse = false;
    }
    //as long as reverse is not equal to 100 increment the offset
    if (reverse === false) {
      offset += 2;
    }
    //if it equals to 100 then decrement 
    if (reverse === true) {
      offset -= 2;
    }
    //call animate so it continues recursively
    requestAnimationFrame(animate);
  }
})();