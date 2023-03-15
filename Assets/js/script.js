const startClass = document.querySelectorAll(".start");
const questionsClass = document.querySelectorAll(".questionsCard");
const endClass = document.querySelectorAll(".end");

const startButton = document.querySelector("#startButton")
const endQuestionsButton = document.querySelector("#endQuestions")
const submitButton = document.querySelector("#submit")

startButton.addEventListener("click", function() {
    for(let i=0; i<startClass.length; i++){
        startClass[i].setAttribute("style", "display: none;")
    }

    for(let i=0; i<questionsClass.length; i++){
        questionsClass[i].setAttribute("style", "display: block;")
    }
})

endQuestionsButton.addEventListener("click", function() {
    for(let i=0; i<questionsClass.length; i++){
        questionsClass[i].style.display = "none";
    }

    for(let i=0; i<endClass.length; i++){
        endClass[i].setAttribute("style", "display: block;")
    }
})

submitButton.addEventListener("click", function() {
    for(let i=0; i<endClass.length; i++){
        endClass[i].setAttribute("style", "display: none;")
    }

    for(let i=0; i<startClass.length; i++){
        startClass[i].setAttribute("style", "display: block;")
    }
})

