var savedInitials = localStorage.getItem('initials');
var savedScore = localStorage.getItem('score');
var scores = [];

// Load previous scores from localStorage
function loadScores() {
    var previousScores = localStorage.getItem("scores");
    previousScores = JSON.parse(previousScores);
    // If previous scores exist, load them into the scores array
    if (previousScores) {
        scores = previousScores;
    }
    avoidDuplicate();
}

function avoidDuplicate() {
    // Check to see if the locally stored savedScore & savedInitials already exist in the scores array
    var duplicateScore;
    for (var i = 0; i < scores.length; i++) {
        if (scores[i].score === savedScore && scores[i].initials === savedInitials) {
            duplicateScore = scores[i];
            break;
        }
    }

    // If the localStorage is already found in the array, skip addScore(). Otherwise, proceed.
    // This prevents adding it every time the page is reloaded.
    if (!duplicateScore) {
        addScore();
    }

    // Create an ordered list from the scores array
    for (var i = 0; i < scores.length; i++) {
        var scoreEl = document.createElement('li');
        scoreEl.className = 'highscore';
        scoreEl.setAttribute('data-id', scores[i].score + scores[i].initials);
        scoreEl.textContent = scores[i].initials + ' - ' + scores[i].score;
        var scoreListEl = document.querySelector('ol.highscores');
        scoreListEl.appendChild(scoreEl);
    }

    // Identify the most recently added score by giving it a unique data-id
    // This will be used to highlight the most recently added score on the list
    var newScoreEl = document.querySelector(".highscore[data-id='" + savedScore + savedInitials + "']");
    newScoreEl.className = 'highscore new';
}

// Add new locally stored savedScore & savedInitials to scores array
function addScore() {
    // Proceed only if each contains a value
    if (savedInitials && savedScore) {
        var newScoreObj = {
            initials: savedInitials,
            score: savedScore
        }
        // Add newScoreObj to scores array
        scores.push(newScoreObj);
        // Sort the array
        scores.sort(compareValues('score', 'desc'));
        // Save the updated array to localStorage
        localStorage.setItem('scores', JSON.stringify(scores));
    }
};

// Sort the array by score in descending order
// The following function is taken from https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/
function compareValues(key, order = 'asc') {
    return function innerSort(a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            // property doesn't exist on either object
            return 0;
          }
      
          const varA = (typeof a[key] === 'string')
            ? a[key].toUpperCase() : a[key];
          const varB = (typeof b[key] === 'string')
            ? b[key].toUpperCase() : b[key];
      
          let comparison = 0;
          if (varA > varB) {
            comparison = 1;
          } else if (varA < varB) {
            comparison = -1;
          }
          return (
            (order === 'desc') ? (comparison * -1) : comparison
          );
        };
    }


function clearScores() {
    // Empty the scores array
    scores = [];
    // Save the empty scores array to localStorage
    localStorage.setItem('scores', JSON.stringify(scores));
    // Remove all scores from the screen
    var allScores = document.querySelectorAll('li.highscore');
    for (var i = 0; i < allScores.length; i++) {
        allScores[i].remove();
    }
}

// Begin function sequence by loading previous scores
loadScores();