"use strict";

const diceEl = document.querySelector(".dice");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnRules = document.querySelector(".btn");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const winnerElement = document.querySelector(".winner");
const winnerPlayerElement = document.querySelector(".winner-player");

// Array to keep track of scores
let scores = [0, 0];

// Variable to keep track of current score
let currentScore = 0;

// Active player which is player 1
let activePlayer = 0;

// Playing boolean
let playing = true;

// At the beginning of the game we are hiding the dice
diceEl.classList.add("hidden");

// Function to initialize the Game
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  diceEl.classList.add("hidden");

  // reset Current Scores and Global Scores
  current0El.textContent = 0;
  current1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;

  // Reset winner player Background
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");

  // Reset winner player message
  document.querySelector(".winner-message").style.display = "none";

  // Remove active player from player 2
  player1El.classList.remove("player--active");
  // Reactivate active player which is player1
  player0El.classList.add("player--active");
};

init();

// Show Rules button Click
function toggleRulesModal() {
  const modal = document.querySelector(".modal");
  modal.classList.toggle("hidden");
}

// Function to switch players
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer == 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

// Roll Dice Button Event Handler
btnRoll.addEventListener("click", function () {
  if (playing) {
    const dice = Math.floor(Math.random() * 6) + 1;

    diceEl.classList.remove("hidden");

    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// Hold Button Event Handler
btnHold.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");

      document.querySelector(".winner-message").textContent = `Player ${
        activePlayer + 1
      } wins!`;
      document.querySelector(".winner-message").style.display = "block";
    } else {
      switchPlayer();
    }
  }
});

// New Game Button Event Handler
btnNew.addEventListener("click", init);
