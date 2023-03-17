const startClass = document.querySelector(".start");
const questionsClass = document.querySelector(".questionCard");
const endClass = document.querySelector(".end");

const startButton = document.querySelector("#startButton")
const nextQuestionsButton = document.querySelector("#endQuestions")
const submitButton = document.querySelector("#submit")

const questionHeader = document.querySelector("#questionTitle")
const answer1 = document.querySelector("#answer1")
const answer2 = document.querySelector("#answer2")
const answer3 = document.querySelector("#answer3")
const answer4 = document.querySelector("#answer4")



const questions = [  [    "What is the difference between '==' and '===' in JavaScript?",    {      a: "Both operators compare value and type, but '===' also compares the object reference.",      b: "Both operators compare value and type, but '==' also compares the object reference.",      c: "'==' compares value and type, while '===' compares only value.",      d: "'===' compares value and type, while '==' compares only value."    },    "d"  ],
  [    "What is the 'this' keyword in JavaScript and how does it work?",    {      a: "'this' refers to the global object in a function that is not a method of an object.",      b: "'this' refers to the object that the method is called on.",      c: "'this' refers to the function itself.",      d: "'this' refers to the last object that was created."    },    "b"  ],
  [    "What is the difference between 'var', 'let', and 'const' in JavaScript?",    {      a: "'var' is used to declare global variables, 'let' is used to declare block-scoped variables, and 'const' is used to declare constants.",      b: "'var' is used to declare block-scoped variables, 'let' is used to declare global variables, and 'const' is used to declare constants.",      c: "'var' is used to declare constants, 'let' is used to declare block-scoped variables, and 'const' is used to declare global variables.",      d: "'var', 'let', and 'const' are interchangeable and can be used to declare variables in any context."    },    "a"  ],
  [    "What is the difference between null and undefined in JavaScript?",    {      a: "Both values represent the absence of a value.",      b: "Undefined means that a variable has been declared but has not been assigned a value, while null is an assignment value that represents no value or no object.",      c: "Null means that a variable has been declared but has not been assigned a value, while undefined is an assignment value that represents no value or no object.",      d: "Undefined and null are equivalent and can be used interchangeably."    },    "b"  ]
];

let questionCount = 0;

function isRight(submitted, correct){
    if(submitted === correct){
        console.log("correct")
        // answer1.removeEventListener()
    }else{
        console.log("wrong")
        console.log("this should clear")
        // a1 is not referenced, I think that it is out of the scope
        answer1.removeEventListener("click", a1())
        // answer2.removeEventListener("click", answer2)
        // answer3.removeEventListener("click", answer3)
        // answer4.removeEventListener("click", answer4)
    }
}



  function runQuestions(i){
    questionCount++
    questionHeader.textContent = questions[i][0];
    answer1.textContent = questions[i][1].a;
    answer2.textContent = questions[i][1].b;
    answer3.textContent = questions[i][1].c;
    answer4.textContent = questions[i][1].d;
    console.log(i)

    // this works but it doesn't work for removing the event listener
    function a1(){isRight("a",questions[i][2])}
    answer1.addEventListener("click", a1())



    //This doesn't work because I can't pass parameters in an event listener
    //It runs independently of the "click"
    answer2.addEventListener("click", isRight("b", questions[i][2]))


    // answer 3 and 4 don't work because I need to be able to remove the
    // event listener and I can't with just a generic function
    answer3.addEventListener("click", function(){
        isRight("c", questions[i][2])
    })

    answer4.addEventListener("click", function(){
        if(questions[i][2] === "d"){
            console.log("CORRECT")
        }else{
            console.log("WRONG")
        }
    })
  }





startButton.addEventListener("click", function() {
    startClass.style.display = "none";
    questionsClass.style.display = "block";
    runQuestions(questionCount)
})

nextQuestionsButton.addEventListener("click", function(){
    if(questionCount > 3){
        questionsClass.style.display = "none";
        endClass.style.display = "block";
    }
    runQuestions(questionCount)
}) 

// {  
//     if(questionCount >= 3){
//         questionsClass.style.display = "none";
//         endClass.style.display = "block";
//     }
// })

submitButton.addEventListener("click", function() {
    endClass.style.display = "none";
    startClass.style.display = "block";
})