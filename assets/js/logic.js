var timeRemaining = document.querySelector('.timer span');
var wrapperEl = document.querySelector('div.wrapper');

var startScreen = function() {
    timeRemaining.textContent = '0'
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

startScreen();

