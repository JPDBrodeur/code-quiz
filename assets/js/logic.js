var timerEl = document.querySelector('.timer span');
var mainWrapperEl = document.querySelector('div.wrapper');

// Set global variable for array reference
var currentQuestion = 0;

function startScreen() {
    timerEl.textContent = '0'

    // Start Wrapper Div
    var startWrapperEl = document.createElement('div');
    startWrapperEl.className = "start-screen"

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
    mainWrapperEl.appendChild(startWrapperEl);
    startWrapperEl.appendChild(h1El);
    startWrapperEl.appendChild(instructionsEl);
    startWrapperEl.appendChild(startBtnEl);

    // Listen for button click
    startWrapperEl.addEventListener('click', start);
}

function start(event) {
    // If the button was pressed...
    if (event.target.type === 'submit') {
        // Begin countdown
        countdown();
        // Remove Start Screen
        var startWrapperEl = document.querySelector('.start-screen')
        startWrapperEl.remove();
        // Begin with the first question
        quiz (0);
    }
}

function countdown() {
    timeLeft = 75;
    var timeInterval = setInterval(function() {
        var endWrapperEl = document.querySelector('.end-screen')
        // If the end screen is present, stop the countdown
        if (endWrapperEl) {
            clearInterval(timeInterval);
        }
        // Countdown by one each second
        else if (timeLeft > 0) {
            timerEl.textContent = timeLeft;
            timeLeft--;
          }
        // If timer reaches 0, end game immediately
        else {
            timerEl.textContent = "0";
            clearInterval(timeInterval);
            // Remove the current question screen
            var questionScreenEl = document.querySelector('.question-screen')
            if (questionScreenEl) {
                questionScreenEl.remove();
            }
            // Display the end screen
            endScreen();
        }
    }, 1000);
}

function quiz(x) {
    // Question Wrapper Div
    var questionWrapperEl = document.createElement('div');
    questionWrapperEl.className = 'question-screen';
    questionWrapperEl.setAttribute("data-prompt-number", (x + 1))

    // Question Prompt
    var h1El = document.createElement('h1');
    h1El.className = 'question-prompt';
    h1El.textContent = questions[x].q;

    // Add to screen
    mainWrapperEl.appendChild(questionWrapperEl);
    questionWrapperEl.appendChild(h1El);

    // Multiple Choice Buttons
    for (var i = 0; i < (questions[x].options.length); i++) {
        // Button Wrapper Divs
        var optionWrapperEl = document.createElement('div');
        optionWrapperEl.className = 'btn-wrap';

        // Button for each available option
        var optionEl = document.createElement('button');
        optionEl.className = 'purple-btn wide-btn';
        optionEl.textContent = (i + 1) + ". " + questions[x].options[i];
        optionEl.setAttribute('id', questions[x].options[i]);

        // Add to screen
        questionWrapperEl.appendChild(optionWrapperEl);
        optionWrapperEl.appendChild(optionEl);
    }

    // Listen for button click
    questionWrapperEl.addEventListener('click', selectedAnswer);
}

function selectedAnswer(event) {
    var targetEl = event.target;
    // If a button was pressed... (prevents clicks in the white space from being recognized)
    if (event.target.type === 'submit') {
        // If the answer is correct...
        if (targetEl.id === questions[currentQuestion].a) {
            feedback('Correct!');
            
        } else {
            feedback('Wrong!');
            // Ten points deducted from countdown
            timeLeft = timeLeft - 10;
        }

        // Remove the current question
        var questionScreenEl = document.querySelector('.question-screen');
        questionScreenEl.remove();

        // If there is another question in the array...
        if (currentQuestion < (questions.length -1)) {
            // Reiterate Quiz function and display next question
            currentQuestion++;
            quiz(currentQuestion);

        } else {
            // Otherwise, end the game
            endScreen();
        }
    }
}

function feedback(text) {
    // Feedback paragraph
    var feedbackEl = document.createElement('p');
    feedbackEl.className = 'feedback';
    feedbackEl.textContent = text;

    // Add to screen
    var feedbackDivEl = document.querySelector('.feedback')
    feedbackDivEl.appendChild(feedbackEl);

    // Remove feedback after 1 second
    setTimeout(function() {
        feedbackEl.remove();
    }, 1000);
}

function endScreen() {
        // End Screen Div
        var endWrapperEl = document.createElement('div');
        endWrapperEl.className = "end-screen"
    
        // End Screen Title
        var h1El = document.createElement('h1');
        h1El.textContent = 'All done!';
    
        // Final Score
        var scoreEl = document.createElement('p');
        scoreEl.textContent = 'Your final score is ' + timeLeft + '.';
        // Make sure the TimerEl displays the same number
        timerEl.textContent = timeLeft;
        
        // Form to capture initials
        var formEl = document.createElement('form');
        formEl.id = 'initials-form';
        formEl.action = 'highscores.html'

        // Input to enter initials
        var initialsInputEl = document.createElement('input');
        initialsInputEl.name = 'initials';
        initialsInputEl.type = 'text';
        initialsInputEl.maxLength = '3';
        initialsInputEl.minLength = '1';

        // Label for input
        var inputLabelEl = document.createElement('label');
        inputLabelEl.for = 'initials';
        inputLabelEl.textContent = 'Enter Initials: ';

        // Submit Button
        var submitBtnEl = document.createElement('button');
        submitBtnEl.className = 'purple-btn smaller-btn';
        submitBtnEl.textContent = 'Submit';
    
        // Add to screen
        mainWrapperEl.appendChild(endWrapperEl);
        endWrapperEl.appendChild(h1El);
        endWrapperEl.appendChild(scoreEl);
        endWrapperEl.appendChild(formEl);
        formEl.appendChild(inputLabelEl);
        formEl.appendChild(initialsInputEl);
        formEl.appendChild(submitBtnEl);
    
        endWrapperEl.addEventListener('submit', saveScore);
}

function saveScore(event) {
    var initialsInput = document.querySelector("input[name='initials']").value;

    // Display alert if no intials are provided upon submit
    if (!initialsInput) {
        alert("Please enter initials to submit your final score.")
        return false;
    }

    // Store initials and score locally
    localStorage.setItem('initials', initialsInput)
    localStorage.setItem('score', timeLeft)
}

startScreen();