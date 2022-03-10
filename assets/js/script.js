/*========================= How to add/change questions in this quiz ===================================

Edit the array of objects below so that each object contains a String "prompt" and Array "answers"...
where "answers" contains 4 Strings and the first index is the correct answer. e.g:

obj = {
    "prompt" : "Enter the prompt as String here",
    "answers" :
        ["Correct", "Wrong", "Wrong Again", "Still Wrong"]
}

The correct answer in the above is targeted with "obj.answers[0]"

The order of answers are randomized during the quiz.
*/

var questionArray = [{
    "prompt" : "What is the correct answer to this question?",
    "answers" :
        ["This is the correct answer.",
        "This is a wrong answer.",
        "This answer is also wrong.",
        "This is not the correct answer."]
},
{
    "prompt" : "What is the right choice?",
    "answers" :
        ["This one.",
        "Not this one.",
        "Don't click here.",
        "No."]
},
{
    "prompt" : "Bet you don't know the correct answer to this. What is it?",
    "answers" :
        ["I know it! It is this one!",
        "I don't know it.",
        "Please, don't make me pick this one.",
        "This choice is incorrect."]
}]

var timeLeft = 75;
var penalty = 10;
var finalScore = 0;
var currQuestion = -1;
var correctAnswerId;

/* ============================================= functions =========================================== */

//displays a welcome message for the user
var welcomeMessage = function() {

    var startButtonEl = document.createElement("button");

    //clear any leftover buttons and text if we were just at highscores page, reset vars
    clearContent();
    timeLeft = 75;
    currQuestion = -1;
    finalScore = 0;

    //add highscores link and initialized timer to header
    document.querySelector("header").innerHTML = "<span>View Highscores</span><div class='float-right' id='timer'>Time: " + timeLeft + "</div>";
    document.querySelector("header span").addEventListener("click", displayHighScores)

    document.querySelector(".card-header").innerHTML = "<h1>Welcome to Code Probe!</h1>";
    document.querySelector(".card-body").innerHTML =
    "<p>You will have " + timeLeft + " seconds to answer as many multiple choice coding questions as you can. Each incorrect answer will subtract " + penalty + " seconds from the clock.</br></br>Good luck!</p>"
    
    // add start button to footer
    startButtonEl.className = "btn";
    startButtonEl.textContent = "START";
    document.querySelector(".card-footer").appendChild(startButtonEl);

    startButtonEl.addEventListener("click", startGame);
};

//function to begin counter and init html for asking questions
var startGame = function() {

    var unorderedListEl = document.createElement("ul");
    
    //remove welcome message and hide high scores button, init prompt message and footer message
    clearContent();
    document.querySelector("header span").remove();
    document.querySelector(".card-header").innerHTML = "<h2 id='prompt'>If you are seeing this, there was an error</h2>";
    document.querySelector(".card-footer").innerHTML = "<h3 id='right-wrong'></h3>";

    //loop 4 times to generate 4 buttons with unique ids and listElements 
    for (i = 0; i < 4; i++) {
        var liEl = document.createElement("li");
        var buttonEl = document.createElement("button");
        buttonEl.className = "btn";
        buttonEl.id = String.fromCharCode(65 + i) + ". "; // button ids = "A. ", "B. ", "C. ", "D. "
        buttonEl.addEventListener("click", nextQuestionHandler);
        liEl.appendChild(buttonEl);
        unorderedListEl.appendChild(liEl);
    };

    document.querySelector(".card-body").appendChild(unorderedListEl);

    //shuffle order of the questions then call the first question
    shuffle(questionArray);
    nextQuestionHandler();

    // running this code every 1000ms
    var counter = setInterval(function() {
        timeLeft--;
        document.getElementById("timer").innerHTML = "Time: " + timeLeft;

        if (timeLeft <= 0 || currQuestion >= questionArray.length) {
            console.log("ran out of time or answered all the questions")
            clearInterval(counter);
            displayScore();
        }   
    }, 1000);
};

//This function is called whenever an answer is clicked
var nextQuestionHandler = function(event) {

    var correctAnswer;
    var targetId;
    var rightWrongEl = document.getElementById("right-wrong")

    currQuestion++;

    //if this is not the first question, display right/wrong message, subtract time if wrong answer, add to score if correct
    if (event) {

        targetId = event.target.id; // which button did user choose?

        if (correctAnswerId === targetId) {
            rightWrongEl.textContent = "Correct!"
            rightWrongEl.style.color = "green";
            finalScore++;
        }
        else {
            rightWrongEl.textContent = "Wrong!"
            rightWrongEl.style.color = "red";
            timeLeft -= 10;
        }

        rightWrongEl.className = "";
        setTimeout(function () {
            rightWrongEl.className = "fade";
            }, 1000);
    }

    //if completed all the questions
    if (currQuestion >= questionArray.length) {
        return;
    }

    //display prompt
    document.getElementById('prompt').textContent = (currQuestion + 1) + ". " + questionArray[currQuestion].prompt;

    //store the correct answer, then shuffle the answers
    correctAnswer = questionArray[currQuestion].answers[0];
    shuffle(questionArray[currQuestion].answers);

    //put the answers in the buttons and take note of the correct answer's Id
    for (i = 0; i < questionArray[currQuestion].answers.length; i++) {
        var currButton = document.getElementById(String.fromCharCode(65 + i) + ". "); //iterate thru id = "A. ", "B. ", etc.
        currButton.textContent = currButton.id + questionArray[currQuestion].answers[i];
        if (currButton.textContent === (currButton.id + correctAnswer)) {
            correctAnswerId = currButton.id;
        }
    }

    console.log((currQuestion + 1) + ". correct answer: " + document.getElementById(correctAnswerId).textContent);
};

//TODO: request initials, display score
var displayScore = function() {

    console.log("Final Score: " + finalScore);
    //TODO: display score
    // request input of initials
    document.querySelector(".card-header").innerHTML = "";
    document.querySelector(".card-body").innerHTML = "";
};

//TODO: Display the high scores
var displayHighScores = function() {

    var backButtonEl = document.createElement("button");
    var clearButtonEl = document.createElement("button");

    clearContent();
    document.querySelector("header").innerHTML = ""; // remove the timer and highscores link

    document.querySelector(".card-header").innerHTML = "<h1>Highscores</h1>";

    // TODO: get high scores from local storage and display
    // if local storage has no high scores, display "No high scores yet"
    
    backButtonEl.className = "btn";
    clearButtonEl.className = "btn";
    clearButtonEl.textContent = "Reset Highscores";
    backButtonEl.textContent = "Go Back";

    document.querySelector(".card-footer").append(backButtonEl, clearButtonEl);

    backButtonEl.addEventListener("click", welcomeMessage);
    clearButtonEl.addEventListener("click", resetHighscores);
};

//TODO
var resetHighscores = function() {
    console.log("reseting highscores")
};

//class is called to remove old content before displaying new content
var clearContent = function() {
    document.querySelector(".card-header").innerHTML = "";
    document.querySelector(".card-body").innerHTML = "";
    document.querySelector(".card-footer").innerHTML = "";
};

/* Randomize array in-place using Durstenfeld shuffle algorithm
https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
*/
var shuffle = function(array) {
    for (var i = array.length - 1; i > 0; i--) { // go backwards thru the array
        var j = Math.floor(Math.random() * (i + 1)); //get a random int between 0 and i, inclusive
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;              // switch array[i] with array[j]
    }
}

welcomeMessage();