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

//adjust these for quiz difficulty
var timeLeft = 75;
var penalty = 10;


/* ============================================= functions =========================================== */

//displays a welcome message for the user
var welcomeMessage = function() {

    var startButtonEl = document.createElement("button");

    //clear any leftover buttons and text if we were just at highscores page
    clearContent();

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

//function to begin counter and ask questions
var startGame = function() {

    var correctAnswer;

    //remove welcome message and hide high scores button while taking quiz
    clearContent();
    document.querySelector("header span").remove();

    //init top text for quiz, iterate through questions
    document.querySelector(".card-header").innerHTML = "<h2 id='question'>Question Goes Here</h2>";
    for (var i = 0; i < questionArray.length; i++) {

        //store correct answer, then shuffle answers
        correctAnswer = questionArray[i].answers[0];
        console.log(questionArray[i].answers);
        shuffle(questionArray[i].answers);
        console.log(questionArray[i].answers);
    }

    // run this code every 1000ms
    var counter = setInterval(function() {
        timeLeft--;
        document.getElementById("timer").innerHTML = "Time: " + timeLeft;

        if (timeLeft <= 0) {
            console.log("ran out of time")
            clearInterval(counter);
            displayScore();
        }   
    }, 1000);
};

//TODO: request initials, display score
var displayScore = function() {
    console.log("displaying your high score. pls enter your initials");
    //TODO: display score
    // request input of initials
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