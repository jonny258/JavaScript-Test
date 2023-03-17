const startClass = document.querySelector(".start");
const questionsClass = document.querySelector(".questionCard");
const endClass = document.querySelector(".end");

const startButton = document.querySelector("#startButton");
const submitButton = document.querySelector("#submit");

const timer = document.querySelector("#timer")

const questionHeader = document.querySelector("#questionTitle");
const answer1 = document.querySelector("#answer1");
const answer2 = document.querySelector("#answer2");
const answer3 = document.querySelector("#answer3");
const answer4 = document.querySelector("#answer4");

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

let questionCount = 0;
let timeLeft = 30;

function isRight(submitted, correct) {
  if (submitted === correct) {
    console.log("correct");

    answer1.removeEventListener("click", a1);
    answer2.removeEventListener("click", a2);
    answer3.removeEventListener("click", a3);
    answer4.removeEventListener("click", a4);

    questionCount++;
    if(questionCount <= 3){
        runQuestions();
    }else{
        questionsClass.style.display = "none";
        endClass.style.display = "block";
    }
  } else {
    console.log("wrong");

    answer1.removeEventListener("click", a1);
    answer2.removeEventListener("click", a2);
    answer3.removeEventListener("click", a3);
    answer4.removeEventListener("click", a4);

    questionCount++;
    if(questionCount <= 3){
        runQuestions();
    }else{
        questionsClass.style.display = "none";
        endClass.style.display = "block";
    }
  }
}

function a1() {isRight("a", questions[questionCount][2])};
function a2() {isRight("b", questions[questionCount][2])};
function a3() {isRight("c", questions[questionCount][2])};
function a4() {isRight("d", questions[questionCount][2])};

function runQuestions() {
  
  questionHeader.textContent = questions[questionCount][0];
  answer1.textContent = questions[questionCount][1].a;
  answer2.textContent = questions[questionCount][1].b;
  answer3.textContent = questions[questionCount][1].c;
  answer4.textContent = questions[questionCount][1].d;

  console.log(questionCount);

  answer1.addEventListener("click", a1);
  answer2.addEventListener("click", a2);
  answer3.addEventListener("click", a3);
  answer4.addEventListener("click", a4);
}

function startTimer() {
    let timerInterval = setInterval(function(){
        timer.textContent = timeLeft;
        timeLeft--
        if( timeLeft === 0){
            clearInterval(timerInterval);
            timer.textContent = "000";
            questionsClass.style.display = "none";
            endClass.style.display = "block";
        }
    }, 1000)
}



startButton.addEventListener("click", function () {
  startClass.style.display = "none";
  questionsClass.style.display = "block";
  runQuestions();
  startTimer()
});


submitButton.addEventListener("click", function () {
  endClass.style.display = "none";
  startClass.style.display = "block";
});