"use strict";
let catBtn = document.querySelector(".cat");
catBtn.addEventListener("click", getCat);

function getCat() {
  /* this code is written using XHR. You will likely see
  XHR when you graduate, even if modern code is written
  with the Fetch API. 
  */
  let xhr = new XMLHttpRequest();
  const url = "https://cataas.com/";
  xhr.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      // callback when result is ready
      let responseText = xhr.responseText;
      let json = JSON.parse(responseText);
      let catUrl = url + json.url;
      document.getElementById("image").src = catUrl;
    }
  };
  //false makes this a synchronous request, but deprecated
  //on modern browsers
  xhr.open("GET", url + "/cat?json=true", false);
  xhr.send();
}

let image = document.getElementById("image");
image.addEventListener("click", move);
/* Inspiration of this terrible animation: 
https://www.w3schools.com/js/js_htmldom_animate.asp
Pro tip: be very careful of the examples in W3Schools! */
function move() {
  let timer = null;
  let pos = image.offsetLeft;
  clearInterval(timer);
  timer = setInterval(frame, 5);
  function frame() {
    if (image.offsetLeft > 350) {
      clearInterval(timer);
      //return back
      image.style.top = "0px";
      image.style.left = "0px";
    } else {
      pos++;
      image.style.top = pos + "px";
      image.style.left = pos + "px";
    }
  }
}