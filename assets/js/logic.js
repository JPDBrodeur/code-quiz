var timerEl = document.querySelector('.timer span');
var wrapperEl = document.querySelector('div.wrapper');

var currentQuestion = 0;

function startScreen() {
    timerEl.textContent = '0'

    // Start Screen Div
    var startScreenEl = document.createElement('div');
    startScreenEl.className = "start-screen"

    // Quiz Title
    var h1El = document.createElement('h1');
    h1El.className = 'centered-text';
    h1El.textContent = 'Coding Quiz Challenge';

    // Instructions
    var instructionsEl = document.createElement('p');
    instructionsEl.className = 'centered-text';
    instructionsEl.innerHTML = 'Try to answer the following code-related questions within the time limit.<br />Keep in mind that incorrect answers will penalize your score/time<br />by ten seconds!';
    
    // Start Button
    var startBtnEl = document.createElement('button');
    startBtnEl.className = 'purple-btn centered-btn';
    startBtnEl.textContent = 'Start Quiz';

    // Add to screen
    wrapperEl.appendChild(startScreenEl);
    startScreenEl.appendChild(h1El);
    startScreenEl.appendChild(instructionsEl);
    startScreenEl.appendChild(startBtnEl);

    startScreenEl.addEventListener('click', start);
}

function start() {
    countdown();
    var startScreenEl = document.querySelector('.start-screen')
    startScreenEl.remove();
    quiz (0);
}

function countdown() {
    timeLeft = 75;
    var timeInterval = setInterval(function() {
        if (timeLeft > 0) {
            timerEl.textContent = timeLeft;
            timeLeft--;
          }
        else {
        timerEl.textContent = "0";
        clearInterval(timeInterval);
        }
    }, 1000);
}

function quiz(x) {
    // Question Div
    var questionDivEl = document.createElement('div');
    questionDivEl.className = 'question-screen';
    questionDivEl.setAttribute("data-prompt-number", (x + 1))

    // Question Prompt
    var h2El = document.createElement('h2');
    h2El.className = 'question-prompt';
    h2El.textContent = questions[x].q;

    wrapperEl.appendChild(questionDivEl);
    questionDivEl.appendChild(h2El);

    var answer = questions[x].a;

    // Multiple Choice Buttons
    for (var i = 0; i < (questions[x].options.length); i++) {
        var btnWrapEl = document.createElement('div');
        btnWrapEl.className = 'btn-wrap';
        questionDivEl.appendChild(btnWrapEl);

        var optionBtnEl = document.createElement('button');
        optionBtnEl.className = 'purple-btn wide-btn';
        optionBtnEl.textContent = (i + 1) + ". " + questions[x].options[i];
        optionBtnEl.setAttribute('id', questions[x].options[i]);
        btnWrapEl.appendChild(optionBtnEl);
    }

    var correctEl = document.querySelector(".wide-btn[data-value='" + answer +"']");    
    questionDivEl.addEventListener('click', selectedAnswer);
}

function selectedAnswer(event) {
    var targetEl = event.target;
    var targetValue = targetEl.getAttribute('data-task-id');

    if (targetEl.id === questions[currentQuestion].a) {
        console.log('Correct!');
        
    } else {
        console.log('Wrong!');
    }

    var questionScreenEl = document.querySelector('.question-screen')
        questionScreenEl.remove();
        if (currentQuestion < (questions.length -1)) {
            currentQuestion++;
            quiz(currentQuestion);
        } else {
            console.log('final score: ' + timeLeft)
        }
}

startScreen();