/*========================= How to add/change questions in this quiz ===================================

Edit the array of objects "questionArray" in welcomeMessage() so that each object contains a String "prompt" and Array "answers"...
where "answers" contains 4 Strings and the first index is the correct answer. e.g:

obj = {
    "prompt" : "Enter the String prompt here",
    "answers" :
        ["Correct",
        "Wrong",
        "Wrong Again",
        "Still Wrong"]
}

The correct answer in the above is targeted with "obj.answers[0]"

The order of answers are randomized during the quiz.
*/

var questionArray;
var timeLeft = 75;
var penalty = 10;
var finalScore = 0;
var currQuestion = -1;
var correctAnswerId;
var scoresArray = JSON.parse(localStorage.getItem("scoresArray"));

var headerEl = document.querySelector("header");
var cardHeaderEl = document.querySelector(".card-header");
var cardBodyEl = document.querySelector(".card-body");
var cardFooterEl = document.querySelector(".card-footer");

/* ============================================= functions =========================================== */

//displays a welcome message for the user
var welcomeMessage = function() {

    var startButtonEl = document.createElement("button");

    //clear any leftover buttons and text if we were just at highscores page, reset vars
    clearContent();
    timeLeft = 75;
    currQuestion = -1;
    finalScore = 0;
    questionArray = [{
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
    },
    {
        "prompt" : "What is the answer?",
        "answers" :
            ["This is the answer.",
            "Not this one.",
            "Nope.",
            "Not this one!"]
    }]

    headerEl.innerHTML = "<span>View Highscores</span><div class='float-right' id='timer'>Time: " + timeLeft + "</div>";
    document.querySelector("header span").addEventListener("click", displayHighScores)

    cardHeaderEl.innerHTML = "<h1>Welcome to Code Probe!</h1>";
    cardBodyEl.innerHTML =
    "<p>You will have " + timeLeft + " seconds to answer as many multiple choice coding questions as you can. Each incorrect answer will subtract " + penalty + " seconds from the clock.</br></br>Good luck!</p>"
    
    startButtonEl.className = "btn";
    startButtonEl.textContent = "START";
    cardFooterEl.appendChild(startButtonEl);

    startButtonEl.addEventListener("click", startGame);
};

//function to begin counter and init html for asking questions
var startGame = function() {

    var unorderedListEl = document.createElement("ul");
    
    //remove welcome message and hide high scores button, init prompt message and footer message
    clearContent();
    document.querySelector("header span").remove();
    cardHeaderEl.innerHTML = "<h2 id='prompt'>If you are seeing this, there was an error</h2>";
    cardFooterEl.innerHTML = "<h3 id='right-wrong'></h3>";

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

    cardBodyEl.appendChild(unorderedListEl);

    //shuffle order of the questions then call the first question
    shuffle(questionArray);
    nextQuestionHandler();

    var counter = setInterval(function() {
        timeLeft--;
        document.getElementById("timer").innerHTML = "Time: " + timeLeft;

        if (timeLeft <= 0 || currQuestion >= questionArray.length) {
            clearInterval(counter);
            displayScore();
        }   
    }, 1000); // running this function every 1000ms
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

    // stop here if completed all the questions
    if (currQuestion >= questionArray.length) {
        return;
    }

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

    //uncomment the next line to cheat
    //console.log((currQuestion + 1) + ". correct answer: " + document.getElementById(correctAnswerId).textContent);
};

//TODO: request initials, display and save score
var displayScore = function() {

    cardHeaderEl.innerHTML = "<h1>New High Score!</h1>";
    cardBodyEl.innerHTML = "<div class='score-card'></div>";

    document.querySelector(".score-card").innerHTML =
    "Questions Answered Correctly: <span>" + finalScore + "</span></br>" +
    "Time Remaining: <span>" + timeLeft + "</span>" +
    "<ul class='list'><li>Accuracy Bonus:<span>" + finalScore + " x 5 = " + (finalScore * 5) + "</span></li>" +
    "<li class='bottom-border'>Time Bonus:<span>" + timeLeft + " / 10 = " + Math.floor(timeLeft / 10) + "</span></li>" +
    "</br><li>Final Score:<span>" + (Math.floor(timeLeft / 10) + finalScore * 5) + "</span></li></ul></br>";

    finalScore = (Math.floor(timeLeft / 10) + finalScore * 5);

    var inputFormEl = document.createElement("div");
    inputFormEl.className = "center";
    inputFormEl.innerHTML =
    "<label for='input_id'>Initials: </label>" +
    "<input type='text' id='input_id' value='' size = '3' maxlength='3' autocomplete='off'>" +
    "<input type='button' class='btn' value='Submit' onclick='saveScore()'/>";

    document.querySelector(".score-card").appendChild(inputFormEl);
};

//saves new score to localstorage and places score into scoresArray (ordered from lowest to highest score)
var saveScore = function() {

    var insertIndex;

    var name = document.getElementById("input_id").value.toUpperCase();
    if (name === "") {
        name = "---";
    }

    var scoreObj = {
        "name" : name,
        "score" : finalScore
    }

    if (!scoresArray) {
        scoresArray = [scoreObj];
        localStorage.setItem("scoresArray", JSON.stringify(scoresArray));
        return displayHighScores();
    }
    
    //get new score index
    for (var i = 0; i < scoresArray.length; i++) {
        if (scoresArray[i].score < finalScore) {
            insertIndex = i + 1;
        }
    }

    //insert new score in order
    scoresArray.splice(insertIndex, 0, scoreObj);

    localStorage.setItem("scoresArray", JSON.stringify(scoresArray));

    displayHighScores();
}

// displays the highscores. If there was a tie, the first player to have reached that score is listed first, 2nd player next, etc.
var displayHighScores = function() {

    var backButtonEl = document.createElement("button");
    var clearButtonEl = document.createElement("button");

    clearContent();
    headerEl.innerHTML = ""; // remove the timer and highscores link

    cardHeaderEl.innerHTML = "<h1>Highscores</h1>";

    backButtonEl.className = "btn";
    clearButtonEl.className = "btn";
    clearButtonEl.textContent = "Reset Highscores";
    backButtonEl.textContent = "Go Back";

    cardFooterEl.append(backButtonEl, clearButtonEl);

    backButtonEl.addEventListener("click", welcomeMessage);
    clearButtonEl.addEventListener("click", resetHighscores);
    
    if (!scoresArray) {
        cardBodyEl.innerHTML = "<p class='center'></br></br>No highscores yet!</p>";
        return;
    }
    else {
        cardBodyEl.innerHTML = "<ol class='list ordered'></ol>";
        var scoresOrderedListEl = document.querySelector(".card-body ol");
    }

    for (var i = scoresArray.length-1; i >= 0; i--) {
        scoresOrderedListEl.innerHTML += "<li>" + scoresArray[i].name + "<span>" + scoresArray[i].score + "</span></li>";
    }
};

//prompt user are you sure? then resets scores from localStorage and scoresArray
var resetHighscores = function() {
    if (window.confirm("Are you sure you want to clear all high scores?\n\nThis cannot be undone.")) {
        scoresArray = null;
        localStorage.clear();
        displayHighScores();
    }
};

//class can be used to remove old content before displaying new content
var clearContent = function() {
    cardHeaderEl.innerHTML = "";
    cardBodyEl.innerHTML = "";
    cardFooterEl.innerHTML = "";
};

/* Randomize array in-place using Durstenfeld shuffle algorithm
https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
*/
var shuffle = function(array) {
    for (var i = array.length - 1; i > 0; i--) { // go backwards thru the array
        var j = Math.floor(Math.random() * (i + 1)); //j = a random int between 0 and i, inclusive
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;              // switch array[i] with array[j]
    }
}

welcomeMessage();