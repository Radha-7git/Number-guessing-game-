const uservalue = document.querySelector(".uservalue");
const trivia = document.getElementById("trivia");
const guess = document.getElementById("guess");
const reset = document.getElementById("reset");
const score = document.getElementById("score");
const highscore = document.getElementById("highscore");
const customani = document.querySelector(".custom-ani");
const find = document.getElementById("find");
const prevguess = document.getElementById("prevguess");
const message = document.getElementById("message");


let strValue = [];
let scoreCard = 10;
let highCard = 10;
const arrHigh = [];
score.innerText = scoreCard;
highscore.innerText = highCard;
message.innerText = "Start guessing a number....";
prevguess.innerText = "Your Previous Guesses";
find.innerText = '?';

let choosenValue;
//generating random number

function generateRandomNumber(){
  choosenValue = Math.trunc(Math.random() * 101);
}
generateRandomNumber()


//function for checking condition for the game process

const executeRun = function (enteredValue) {
  if (enteredValue === "") {
    message.innerText = `input should not be empty`;
  } else {
    if (scoreCard !== 0) {
      if (enteredValue === choosenValue) {
        message.innerText = `You Matched the Number!!!`;
        find.innerText = enteredValue;
        customani.classList.add("rotate-y-360");
        arrHigh.push(scoreCard)
        maximumScore();
        return;
      } else if (enteredValue > choosenValue) {
        message.innerText = `Guess Some Lower Values`;
        scoreCard--;
      } else if (enteredValue < choosenValue) {
        message.innerText = `Guess Some Higher Values`;
        scoreCard--;
      }
      score.innerText = scoreCard;
      strValue.push(enteredValue);
    } else {
      message.innerText = `Chances are out you lose`;
    }
  }
};

// click event to the button to begin the process

guess.addEventListener("click", () => {
  const enteredValue = Number(uservalue.value);
  showTrivia(enteredValue);
  executeRun(enteredValue);
  prevguess.innerText = `${strValue}`;
});

// function that generates trivia based on the values user enters

function showTrivia(enteredValue) {
  fetch(`http://numbersapi.com/${enteredValue}`)
    .then((response) => response.text())
    .then((data) => {
      trivia.innerText = data;
    })
    .catch((error) => console.error("Error fetching data:", error));
}

// function to display starting random trivia

function strtExe(){
  showTrivia(Math.floor(Math.random() * 150));
}

strtExe();

// function for setting highscore

function maximumScore() {
  if (arrHigh.length > 0) {
    highscore.innerText = Math.max(...arrHigh);
  }
}

maximumScore();


// adding functionality to reset button

reset.addEventListener('click', () =>{
  prevguess.innerText = 'Your Previous Guesses';
  score.innerText = 10;
  scoreCard = 10;
  strValue = [];
  message.innerText = '';
  message.innerText = "Start guessing a number....";
  uservalue.value = '';
  find.innerText = "?";
  customani.classList.remove("rotate-y-360");
  generateRandomNumber();
  strtExe();
})