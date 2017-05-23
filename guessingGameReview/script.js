document.addEventListener('DOMContentLoaded', function() {
  let answer = getRandomNumber();
  let form = document.querySelector('form');
  let messageLabel = document.querySelector('main p');
  let startMessage = "Guess a number from 1 to 100"
  let newGameLink = document.querySelector('a');
  let guess = document.getElementById('guess');
  let numberOfGuesses = 0;
  let guessButton = document.querySelector('input[type=submit]');
  console.log(guessButton);
  messageLabel.textContent = startMessage;

  function getRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }

  function processGuess(text) {
    let guess = parseInt(text);
    if(isValidGuess(guess)) {
      numberOfGuesses++;
      return guess;
    } else {
      alert("I didn't recognize your guess as a number");
    }
    return undefined;
  }

  function isValidGuess(currentGuess) {
    return !isNaN(currentGuess);
  }

  newGameLink.onclick = function(event) {
    event.preventDefault();
    answer = getRandomNumber();
    messageLabel.textContent = startMessage;
    guess.value = '';
    numberOfGuesses = 0;
    guessButton.disabled = false;
  }

  form.onsubmit = function(event) {
    event.preventDefault();
    let currentGuess = processGuess(guess.value);
    let message;

    if (currentGuess > answer) {
      message = `My number is lower than ${currentGuess}.`
    } else if (currentGuess < answer) {
      message = `My number is higher than ${currentGuess}.`
    } else if (currentGuess === answer) {
      message =  `You guessed my number in ${numberOfGuesses} guess(es)!`
      guessButton.disabled = true;
    }
    messageLabel.textContent = message;
  }
});