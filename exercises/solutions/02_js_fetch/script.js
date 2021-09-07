"use strict";

document.addEventListener("DOMContentLoaded", getQuestion);

let currentQ;

function getQuestion() {
  const url = "https://opentdb.com/api.php?amount=1&category=18";
  fetch(url).
    then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Status code: " + response.status)
      }
    }).
    then(display).
    catch(showError);
}

function display(json) {
  currentQ = json.results[0];
  const question = document.getElementById("question");
  const nextQ = document.createElement("p");
  question.appendChild(nextQ);
  nextQ.innerHTML = json.results[0].question;

  const answers = document.getElementById("answers");
  
  let answerArray = json.results[0].incorrect_answers;
  answerArray.push(json.results[0].correct_answer);
  answerArray.sort();
  answerArray.forEach((item, index) => {
    let paragraph = document.createElement("p");
    answers.appendChild(paragraph);
    let radio = document.createElement("input");
    radio.setAttribute("type", "radio");
    radio.setAttribute("value", item);
    radio.id = "answer" + index;
    paragraph.appendChild(radio);
    let label = document.createElement("label");   
    label.setAttribute("for", radio.id);
    label.innerHTML = item;  
    paragraph.appendChild(label);
  })
  answers.addEventListener("click", updateResult);
}

function updateResult(e) {
  const clicked = e.target;
  let message;
  if (clicked.localName === "input") {
    let selectedValue = e.target.value;
    if (selectedValue === currentQ.correct_answer) {
      message = "You Win";
    }else {
      message = "You lost!!";
    }
    const result = document.getElementById("result");
    result.textContent = message;
    showBtn();
  }
}

function reset() {
  const question = document.getElementById("question"); 
  question.textContent = "";
  const answers = document.getElementById("answers");
  answers.textContent = "";
  const result = document.getElementById("result");
  result.textContent = "";
  const button = document.querySelector("button");
  button.className = "hidden";
  const message = document.querySelector(".error"); 
  message.textContent = "";
  getQuestion();
}

function showError(error) {
  console.error(error);
  const message = document.querySelector(".error"); 
  message.textContent = error.message;
  showBtn();
}

function showBtn() {
  const button = document.querySelector("button");
  button.className = "visible";
  button.addEventListener("click", reset);
}
