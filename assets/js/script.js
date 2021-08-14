var savedInitials = "";
var savedScore = "";
var scores = [];

function loadScores() {
    var previousScores = localStorage.getItem("scores");
    previousScores = JSON.parse(previousScores);
    if (previousScores) {
        scores = previousScores;
    }
    addScore();
}

function addScore() {
    savedInitials = localStorage.getItem('initials');
    savedScore = localStorage.getItem('score');
    if (savedInitials && savedScore) {
        var newScoreObj = {
            initials: savedInitials,
            score: savedScore
        }
        scores.push(newScoreObj);
        scores.sort(compareValues('score', 'desc'));
        localStorage.setItem('scores', JSON.stringify(scores));

        for (var i = 0; i < scores.length; i++) {
            var scoreEl = document.createElement('li');
            scoreEl.className = 'highscore';
            debugger;
            scoreEl.setAttribute('data-id', scores[i].score + scores[i].initials);
            scoreEl.textContent = scores[i].initials + ' - ' + scores[i].score;
            var scoreListEl = document.querySelector('ol.highscores');
            scoreListEl.appendChild(scoreEl);
        }

        var newScoreEl = document.querySelector(".highscore[data-id='" + savedScore + savedInitials + "']");
        newScoreEl.className = 'highscore new';
    }
};

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
    scores = [];
    localStorage.setItem('scores', JSON.stringify(scores));
    var allScores = document.querySelectorAll('li.highscore');
    for (var i = 0; i < allScores.length; i++) {
        allScores[i].remove();
    }
}

loadScores();