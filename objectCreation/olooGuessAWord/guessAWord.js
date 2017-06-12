let randomWord = (function() {
  let wordArray = ['abacus', 'quotient', 'octothorpe', 'proselytize', 'stipend'];
  return function() {
    let index = Math.floor(Math.random() * wordArray.length);
    let word =  wordArray.splice(index, 1)[0];
    return word;
  };
})();

let  GuessAWord = {
  maxMisses: 6,
  init() {
    this.currentWord = randomWord();
    if (!this.currentWord) {
      this.displayMessage(this.messages.outOfWords);
      $('#play-again').text('');
      return this;
    }
    this.missedCount = 0;
    this.lettersGuessed = [];
    this.$gameObjects.apples.removeClass();
    $('body').removeClass();
    this.$gameObjects.guesses.find('span').remove();
    this.displayMessage(this.messages.reset);
    $('#play-again').text('');
    this.fillSpaces();
    this.bind();
  }
}

GuessAWord.bind = function() {
    $(document).on('keypress.game', this.processGuess.bind(this));
};

GuessAWord.unbind = function() {
  $(document).off('.game');
};

GuessAWord.$gameObjects = {
    letters: $('#spaces'),
    guesses: $('#guesses'),
    apples: $('#apples'),
    message: $('#message'),
    spaces: $('#spaces > span')
};

GuessAWord.messages  = {
    outOfWords: "Sorry I've run out of words!",
    win: 'You win!',
    lose: 'Sorry! You lost this time!',
    reset: ''
};

GuessAWord.displayMessage = function(text) {
    this.$gameObjects.message.text(text);
};

GuessAWord.addGuess = function(letter) {
  this.$gameObjects.guesses.append(`<span>${letter}</span>`);
  this.lettersGuessed.push(letter);
  if($.inArray(letter, this.currentWord.split('')) !== -1) {
    this.fillSpacesFor(letter);
  } else {
    this.$gameObjects.apples.removeClass().addClass(`guess-${++this.missedCount}`);
  }
  if (this.isAnswerCorrect()) {
    this.endGame(true);
  } else if (this.missedCount === this.maxMisses) {
    this.endGame(false);
  }
};

GuessAWord.fillSpaces = function() {
  this.$gameObjects.spaces.remove('span');
  this.currentWord.split('').forEach(_ => {
    this.$gameObjects.letters.append(`<span></span>`);
  });
  this.$gameObjects.spaces = $('#spaces span');
};

GuessAWord.isDuplicateGuess = function(letter) {
    return $.inArray(letter, this.lettersGuessed) !== -1;
};

GuessAWord.processGuess = function(e) {
  e.preventDefault();
  let val = e.which;
  let letter = String.fromCharCode(val);
  if (val < 97 && val > 122 || this.isDuplicateGuess(letter)) {
    return;
  }
  this.addGuess(letter);
};

GuessAWord.fillSpacesFor = function(letter) {
  let that = this;
  this.currentWord.split('').forEach((char, idx) => {
    if (char === letter) {
      that.$gameObjects.spaces.eq(idx).text(char);
    }
  });
};

GuessAWord.isAnswerCorrect = function() {
  return this.$gameObjects.spaces.map(function(idx, el) {
    return $(el).text();
  }).get().join('') === this.currentWord;
};

GuessAWord.endGame = function(isWon) {
  this.displayMessage(isWon ? this.messages.win : this.messages.lose);
  $('body').addClass(isWon ? 'win' : 'lose');
  $('#play-again').text('Play Again');
  this.unbind();
};



let game = Object.create(GuessAWord).init();
$('#play-again').on('click.game', function(e) {
  e.preventDefault();
  game = Object.create(GuessAWord).init();
});

