// These are the different pages that are shown
const startClass = document.querySelector(".start");
const questionsClass = document.querySelector(".questionCard");
const endClass = document.querySelector(".end");
const restartPage = document.querySelector(".restart")

const startButton = document.querySelector("#startButton");
const submitButton = document.querySelector("#submit");
const restartButton = document.querySelector("#restartButton");

const timer = document.querySelector("#timer");
const input = document.querySelector("#initials");
const curScore = document.querySelector("#curScore");
const highScoreView = document.querySelector("#highScoreView");
const highScoreList = document.querySelector(".highscoreList");

const questionHeader = document.querySelector("#questionTitle");
const answer1 = document.querySelector("#answer1");
const answer2 = document.querySelector("#answer2");
const answer3 = document.querySelector("#answer3");
const answer4 = document.querySelector("#answer4");

//This is the array that my functions pull from to show the different questions
const questions = [
  [
    "What is the difference between '==' and '===' in JavaScript?",
    {
      a: "Both operators compare value and type, but '===' also compares the object reference.",
      b: "Both operators compare value and type, but '==' also compares the object reference.",
      c: "'==' compares value and type, while '===' compares only value.",
      d: "'===' compares value and type, while '==' compares only value.",
    },
    "d",
  ],
  [
    "What is the 'this' keyword in JavaScript and how does it work?",
    {
      a: "'this' refers to the global object in a function that is not a method of an object.",
      b: "'this' refers to the object that the method is called on.",
      c: "'this' refers to the function itself.",
      d: "'this' refers to the last object that was created.",
    },
    "b",
  ],
  [
    "What is the difference between 'var', 'let', and 'const' in JavaScript?",
    {
      a: "'var' is used to declare global variables, 'let' is used to declare block-scoped variables, and 'const' is used to declare constants.",
      b: "'var' is used to declare block-scoped variables, 'let' is used to declare global variables, and 'const' is used to declare constants.",
      c: "'var' is used to declare constants, 'let' is used to declare block-scoped variables, and 'const' is used to declare global variables.",
      d: "'var', 'let', and 'const' are interchangeable and can be used to declare variables in any context.",
    },
    "a",
  ],
  [
    "What is the difference between null and undefined in JavaScript?",
    {
      a: "Both values represent the absence of a value.",
      b: "Undefined means that a variable has been declared but has not been assigned a value, while null is an assignment value that represents no value or no object.",
      c: "Null means that a variable has been declared but has not been assigned a value, while undefined is an assignment value that represents no value or no object.",
      d: "Undefined and null are equivalent and can be used interchangeably.",
    },
    "b",
  ],
];

//defining the varibles in the global scope and pulling the previous scores into high score array
let questionCount = 0;
let timeLeft = 30;
let score = 0;
let timerInterval;
let highScoresArr = JSON.parse(localStorage.getItem("Highscores"));
let highscoreflip = true;


function finished(){
    score += timeLeft;
    curScore.textContent = score;
    clearInterval(timerInterval)
    timer.textContent = "000";
    questionsClass.style.display = "none";
    endClass.style.display = "block";
}

//resets the event listeners then either runs the next question or ends the quiz
function nextQuestion(){
    answer1.removeEventListener("click", a1);
    answer2.removeEventListener("click", a2);
    answer3.removeEventListener("click", a3);
    answer4.removeEventListener("click", a4);

    questionCount++;
    if(questionCount <= 3){
        runQuestions();
    }else{
        finished()
    }
}

//Determines whether the answer pressed is the correct one
function isRight(submitted, correct) {
  if (submitted === correct) {
    score += 10;
    curScore.textContent = score;
    nextQuestion()
  } else {
    timeLeft -= 5;
    nextQuestion()
  }
}

//These fuctions below just pass parameters to the "isRight" function they have to be seperate and in the 
//global scope so they can work with the removeEventListeners
function a1() {isRight("a", questions[questionCount][2])};
function a2() {isRight("b", questions[questionCount][2])};
function a3() {isRight("c", questions[questionCount][2])};
function a4() {isRight("d", questions[questionCount][2])};


function runQuestions() {
  //Changes the text on the questions and answers
  questionHeader.textContent = questions[questionCount][0];
  answer1.textContent = questions[questionCount][1].a;
  answer2.textContent = questions[questionCount][1].b;
  answer3.textContent = questions[questionCount][1].c;
  answer4.textContent = questions[questionCount][1].d;

  //Makes all the questions clickable
  answer1.addEventListener("click", a1);
  answer2.addEventListener("click", a2);
  answer3.addEventListener("click", a3);
  answer4.addEventListener("click", a4);
}


function startTimer() {
    timerInterval = setInterval(function(){
        timer.textContent = timeLeft;
        timeLeft--
        if( timeLeft === 0){
            finished()
        }
    }, 1000)
}

function submitInitials() {
    //Makes sure that what was submitted is only the initials if not the function resets
    if(input.value.length > 3){
        alert("Please enter just your initials")
        input.value = ""
        submitInitials()
    }
    //if the localstoreage is empty this sets highScoresArr to an empty array so that the push method still works
    if(highScoresArr === null){
        highScoresArr = []
    };
    let gameInput = input.value + "  " + score;
    console.log(highScoresArr)
    highScoresArr.push(gameInput)
    localStorage.setItem("Highscores", JSON.stringify(highScoresArr))
    endClass.style.display = "none"
    restartPage.style.display = "block"
    input.value = ""
    
}

function highScoreFunction() {
    highScoreList.innerHTML = ""
    for(let i=0; i<highScoresArr.length; i++){
        //creates li elements for each highscore then displays them
        let singleHighscore = document.createElement("li");
        singleHighscore.textContent = highScoresArr[i];
        highScoreList.appendChild(singleHighscore);
    }
}

//returns everything to default so that the game can be played again
restartButton.addEventListener("click", function(){
    startClass.style.display = "block";
    restartPage.style.display = "none";
    questionCount = 0;
    timeLeft = 30;
    score = 0;
    timerInterval;
    highScoresArr = JSON.parse(localStorage.getItem("Highscores"));
    highscoreflip = true;
})

startButton.addEventListener("click", function () {
  startClass.style.display = "none";
  questionsClass.style.display = "block";
  curScore.textContent = 0;
  runQuestions();
  startTimer()
});

//This lets me open and close the highscore list using the same event listener
highScoreView.addEventListener("click", function(){
    if(highscoreflip){
        highScoreList.style.display = "block"
        highScoreView.textContent = "Close HighScores"
        highScoreFunction()
    }else{
        highScoreList.style.display = "none"
        highScoreView.textContent = "Veiw HighScores"
    }
    highscoreflip = !highscoreflip

})

submitButton.addEventListener("click", submitInitials)