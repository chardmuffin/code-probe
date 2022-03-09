
var timeLeft = 75;

var welcomeMessage = function() {

    //clear any leftover buttons and text if we were just at highscores page
    clearContent();

    document.querySelector(".card-header").innerHTML = "<h1>Welcome to Code Probe!</h1>";
    document.querySelector(".card-body").innerHTML =
    "<p>You will have 75 seconds to answer as many multiple choice coding questions as you can. Each incorrect answer will subtract 10 seconds from the clock.</br></br>Good luck!</p>"
    
    //create the start button and add to footer
    var startButtonEl = document.createElement("button");
    startButtonEl.className = "btn";
    startButtonEl.textContent = "START";
    document.querySelector(".card-footer").appendChild(startButtonEl);

    startButtonEl.addEventListener("click", startGame);
};

//function to begin counter
var startGame = function() {

    clearContent();

    document.querySelector(".card-header").innerHTML = "<h2 id='question'>Question Goes Here</h2>";

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

    clearContent();

    document.querySelector(".card-header").innerHTML = "<h1>Highscores</h1>";

    var backButtonEl = document.createElement("button");
    var clearButtonEl = document.createElement("button");
    
    backButtonEl.className = "btn";
    clearButtonEl.className = "btn";
    clearButtonEl.textContent = "Reset Highscores";
    backButtonEl.textContent = "Go Back";

    document.querySelector(".card-footer").append(backButtonEl, clearButtonEl);

    backButtonEl.addEventListener("click", welcomeMessage);
    clearButtonEl.addEventListener("click", resetHighscores);

    // TODO: get high scores from local storage and display
    // if local storage has no high scores, display "No high scores yet"
};

//TODO
var resetHighscores = function() {
    console.log("resetting highscores")
};

//class is called to remove old content before displaying new content
var clearContent = function() {
    document.querySelector(".card-header").innerHTML = "";
    document.querySelector(".card-body").innerHTML = "";
    document.querySelector(".card-footer").innerHTML = "";
};

welcomeMessage();
document.querySelector("header span").addEventListener("click", displayHighScores)