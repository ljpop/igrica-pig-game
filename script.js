'use strict';

//Selecting Elements - not values!!
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const curentScore0EL = document.querySelector('#current--0');
const curentScore1EL = document.querySelector('#current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const ime0 = document.getElementById('name--0');
const ime1 = document.getElementById('name--1');

//Imena igraca
function unesiIme(brIgraca) {
  var person = prompt(`Унесите име ${brIgraca} играча:`, '');
  if (person == null || person == '' || person == '  ') {
    return (person = 'Без имена');
  }
  return person;
}

ime0.textContent = unesiIme('првог');
ime1.textContent = unesiIme('другог');

//Starting conditions

let scores;
let currentScore;
let activePlayer;
let playing;

const initFunction = function () {
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  scores = [0, 0];
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');

  document.querySelector(`.player--0`).classList.add('player--active');
  document.querySelector(`.player--1`).classList.remove('player--active');
  document.querySelector(`.player--0`).classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--winner');

  curentScore0EL.textContent = 0;
  curentScore1EL.textContent = 0;
};

initFunction();

const swtichPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Rooling dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. Generating a random number
    const dice = Math.trunc(Math.random() * 6) + 1;
    //2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //3. Check for rolled 1: if true switch to the next player
    if (dice !== 1) {
      //Add dice to current score
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore; //

      //curentScore0EL.textContent = currentScore; //
    } else {
      //Switch to the next player
      swtichPlayer();
    }
    /* console.log(dice, curentScore0EL.textContent, curentScore1EL.textContent); */
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1. Add current score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. Check is score>100
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //3. Switch the player
      swtichPlayer();
    }
  }
});

btnNew.addEventListener('click', initFunction);
