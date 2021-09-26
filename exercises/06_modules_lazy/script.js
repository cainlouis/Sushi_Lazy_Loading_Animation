"use strict";
let date = document.querySelector("#day-of-week");
date.addEventListener("change", (event) => {
  const dateArray = event.target.value.split("-");
  const day = getDay(parseInt(dateArray[0]), parseInt(dateArray[1]), 
    parseInt(dateArray[2]));
  const result = document.querySelector("#result");
  result.textContent = `Your date falls on a ${day}`;
});

/**
 * Returns the day of week (string).
 * Implements Zeller's congrunec formula
 * https://en.wikipedia.org/wiki/Zeller%27s_congruence
 * @param {int} year 
 * @param {int} month 
 * @param {int} day 
 */
function getDay(year, month, day) {
  let q = day;
  let m;
  if (month <= 2) {
    m = month + 12;
    year = year - 1;
  } else {
    m = month;
  }
  let K = year % 100;
  let J = Math.floor(year / 100);

  let h = (q + Math.floor(13 * (m + 1) / 5) + K + 
    Math.floor(K / 4) + Math.floor(J / 4) - 2 * J) % 7;
  
  switch (h) {
  case 0: return "Saturday";
  case 1: return "Sunday";
  case 2: return "Monday";
  case 3: return "Tuesday";
  case 4: return "Wednesday";
  case 5: return "Thursday";
  default: return "Friday";
  }

}

