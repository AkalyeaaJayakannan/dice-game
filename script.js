'use strict';
// selecting elements and IDs
let player0 = document.querySelector('.player--0');
let player1 = document.querySelector('.player--1');
let score0El = document.getElementById('score--0');
let score1El = document.getElementById('score--1');
let current0 = document.getElementById('current--0');
let current1 = document.getElementById('current--1');
let diceEl = document.querySelector('.dice');
let diceRollBtn = document.querySelector('.btn--roll');
let hold = document.querySelector('.btn--hold');
let newBtn = document.querySelector('.btn--new');
let currenScore = document.querySelector('.current-score');

//initial values
let scores, currentScore, currentPlayer, holdScore, playing;

let init = function () {
  scores = [0, 0];
  currentScore = 0;
  currentPlayer = 0;
  holdScore = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;
  diceEl.classList.add('hidden');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
};
init();

// function declaration
let switchPlayer = function () {
  document.getElementById(`current--${currentPlayer}`).textContent = 0;
  currentScore = 0;
  currentPlayer = currentPlayer == 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
  // document.querySelector(``);
};

//display dice on dice roll
diceRollBtn.addEventListener('click', function () {
  if (playing) {
    // rolling the dice
    let diceRoll = Math.trunc(Math.random() * 6) + 1;
    console.log(diceRoll);
    // displaying the dice according the roll value
    diceEl.src = `dice-${diceRoll}.png`;
    // if not rolled 1 display in current
    if (diceRoll !== 1) {
      diceEl.classList.remove('hidden');
      currentScore += diceRoll;
      document.querySelector(`#current--${currentPlayer}`).textContent =
        currentScore; // change later
      holdScore = currentScore;
      // console.log(`can hold ${holdScore} if needed`);
    } else {
      // if rolled 1 switch to next player
      switchPlayer();
    }
  }
});

hold.addEventListener('click', function () {
  if (playing) {
    // add the hold score to scores
    scores[`${currentPlayer}`] += holdScore;
    document.querySelector(`#score--${currentPlayer}`).textContent =
      scores[`${currentPlayer}`];
    holdScore = 0;
    if (scores[`${currentPlayer}`] >= 50) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.add('player--winner');
      console.log(currentPlayer + 'current player');
    } else {
      // else  switch player
      switchPlayer();
      // }
    }
  }
});

newBtn.addEventListener('click', init);
