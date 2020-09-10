var timerEl = document.getElementById("timer");
var questionEl= document.getElementById("quiz");
var startButtonEl = document.getElementById("start");
var optionsEl = document.getElementById("options");
var outcomeEl = document.getElementById("outcome");
var scoreboardEl = document.getElementById("highscores");
var returnEl = document.getElementById("return");
var clearEl = document.getElementById("clear");
var testTime = 50;
var questionCount = 0;
var correctAnswers = 0;
var outcomeText = "";

var quizQandA = [
    {
        question: "Which of the following is not JavaScript Data Types?",
        options: ["Undefined", "Number", "Boolean", "Float"],
        answer: "Float"
    },
    {
        question: "Inside which HTML element do we put the JavaScript?",
        options: ["script", "head", "meta", "style"],
        answer: "script"
    },
    {
        question: "Which of the following is the correct syntax to display an alert box using JavaScript?",
        options: ["alert-box()", "confirm()", "msgbox()", "alert()"],
        answer: "alert()"
    },
    {
        question: "JavaScript is designed for following purpose -",
        options: ["to style HTML pages", "to execute Queries related to databases on a server", "to add interactivity to html pages", "All of the above"],
        answer: "All of the above"
    },
    {
        question: "Javascript string using double quotes is exactly the same as a string using single quotes?",
        options: ["True", "False"],
        answer: "True"
    }, 
];

var highscores = [];


// activates countdown & sets first question
function startQuiz(){
    questionEl.style.textAlign = 'left';
    questionEl.style.marginBottom = '20px';
    questionEl.style.fontSize = '20px';
    countdown();
    setQuestion();
};

// starts countdown
function countdown() {
    var timeInterval = setInterval(function() {
        timerEl.textContent = testTime;
        testTime-- 
        // ends countdown if either the time remaining hits 0 or there are no questions left 
        if (testTime === 0 || questionCount >= quizQandA.length) {
            if (testTime === 0){
                timerEl.textContent = 0;
            }
            clearInterval(timeInterval);
            endQuiz();
        };
    }, 1000);
};

// renders questions on page
function setQuestion(){
    questionEl.textContent = quizQandA[questionCount].question;
    setOptions();
};

// renders answer options on page
function setOptions(){
    for (var i = 0; i < quizQandA[questionCount].options.length; i++){
        var li = document.createElement("li");
        li.id = i;
        li.innerHTML = " <button >" + quizQandA[questionCount].options[i] + "</button>";
        optionsEl.append(li);
    };
};

// checks validity of answer
function checkAnswer(){
    var userSelection = event.target.textContent;
    var answer = quizQandA[questionCount].answer;
    questionCount++;
    // if correct answer is chosen, activates correct function
    if (answer === userSelection) {
        correct();
    }
    // if incorrect answer is chosen, activates incorrect function
    else {
        incorrect();
    };
    // once answer validity has been established, if there are more questions left in the quiz, sets the next question
    if (questionCount < quizQandA.length){
        optionsEl.innerHTML = "";
        setQuestion();
    }
    // if there are no more questions left in the quiz, ends the quiz
    else {
        endQuiz();
    };
};

// for incorrect answers, time is deducted from remaining time left 
function incorrect(){
    testTime -= 5;
    outcomeText = "Wrong";
    flashText();
};

// for correct answers, points are added to correct answer count 
function correct(){
    correctAnswers++;
    outcomeText = "Correct";
    flashText();
};

// result of last answer attempt is displayed on screen for 1 sec
function flashText(){
        outcomeEl.textContent = outcomeText + " answer!";
    setTimeout(function(){
        outcomeEl.textContent = "";
    }, 1000)
};

// end of quiz activates score calculation and submit form function
function endQuiz(){
    calculateScore();
    submitScore();
};

// calculates final score based on number of correct answers and time left on timer 
function calculateScore(){
    finalScore = testTime + correctAnswers;
};

// form for user to add score to scoreboard activates
function submitScore(){
    optionsEl.innerHTML = "";

    questionEl.textContent = "Your final score is " + finalScore + "!";
    
    var form = document.createElement("form");
    form.setAttribute("class", "content");

    var br = document.createElement("br");

    var instructions = document.createElement("h4");
    instructions.textContent = "Submit your score to the scoreboard";

    var input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("class", "form-control");
    input.setAttribute("id", "name");
    input.setAttribute("placeholder", "Enter initials here");
   
    var submit = document.createElement("a");
    submit.setAttribute("href", "scores.html");
    submit.setAttribute("type", "button");
    submit.setAttribute("id", "submit");
    submit.setAttribute("class", "btn btn-secondary");
    submit.textContent = "Submit";

    form.appendChild(br.cloneNode());
    form.appendChild(instructions);
    form.appendChild(br.cloneNode());
    form.appendChild(input);
    form.appendChild(br.cloneNode());
    form.appendChild(submit);

    questionEl.append(form);
};

// adds submitted player scores to the highscore page
function scoreboard(){
    // adds new score to the playerScore array
    var playerScore = [];
    playerScore.push({Name: playerInitial, Score: finalScore});
    console.log(playerScore);
    // sorts scores descending numerically and adds to highscore array
    highscores = playerScore.slice().sort((a,b)=>b-a);
    
    // displays all saved scores on highscore page in order
    for (var i= 0; i < highscores.length; i++){
        var li = document.createElement("li");
        li.textContent = highscores[i].Score + "  : " + highscores[i].Name;
        scoreboardEl.append(li);
    };
    // submits final score to local storage
    var key = localStorage.getItem('key');
    var count = localStorage.getItem('count');
    localStorage.setItem({'key': highscores.Name, 'count': highscores.Score});
};

// clicking on the start button activates quiz
startButtonEl.addEventListener('click', function(event) {
    event.stopPropagation();
    startQuiz()});

// clicking on the answer options, activates the check answer function
optionsEl.addEventListener('click', 
    function(event) {
        event.stopPropagation();
        if (event.target.matches('button')) {
            checkAnswer();
        };
    },
);

// clicking on the submit button, sends name and score to the scoreboard
var submitEl = document.getElementById("submit");
var inputEl = document.querySelector("#name");
submitEl.addEventListener('click', function(event) {
    var playerInitial = inputEl.value;
    console.log(playerInitial);
    scoreboard();
},);

//clickevent = clear highscores - clears systems storage
clearEl.addEventListener('click', );

