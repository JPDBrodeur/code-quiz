var pageContentEl = document.querySelector('body');
var timerEl = document.querySelector('.timer span');
var wrapperEl = document.querySelector('div.wrapper');

function startScreen() {
    timerEl.textContent = '0'
    // Start Div
    var startingDivEl = document.createElement('div');
    startingDivEl.className = 'start-screen';
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

    wrapperEl.appendChild(startingDivEl);
    startingDivEl.appendChild(h1El);
    startingDivEl.appendChild(instructionsEl);
    startingDivEl.appendChild(startBtnEl);
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


function quiz() {
    for (var i = 0; i < tasks.length; i++) {
        
    }
}

pageContentEl.addEventListener('click', countdown);

startScreen();