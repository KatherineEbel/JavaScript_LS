var $message = $("#message"), 
    $letters = $("#word"),
    $guesses = $("#guesses"),
    $apples = $("#apples");
    $replay = $("#replay");

$replay.on("click", function(event) {
  event.preventDefault();
  new GuessAWord();
});

var randomWord = function() {
  var words = ['apple', 'banana', 'orange', 'pear'];

  function without() {
    var new_arr = [],
        args = Array.prototype.slice.call(arguments);
    words.forEach(function(el) {
      if (args.indexOf(el) === -1) {
        new_arr.push(el);
      }
    });

    return new_arr;
  }

  return function() {
    var word = words[Math.floor(Math.random() * words.length)];
    words = without(word);
    return word;
  };
}();

function GuessAWord() {
  this.incorrect = 0;
  this.letters_guessed = []; 
  this.correct_spaces = 0;
  this.guesses_allowed = 6;
  this.word = randomWord();
  if (!this.word) {
    this.displayMessage("Sorry, I've run out of words!");
    this.toggleReplay(false);
    return this;
  } 
  this.word = this.word.split("");
  this.init();
}

GuessAWord.prototype = {
  guesses: 6,
  createBlanks: function() {
    var spaces = (new Array(this.word.length + 1)).join("<span></span>");
    $letters.find("span").remove();
    $letters.append(spaces);
    this.$spaces = $("#word span");
  },
  fillBlanksFor: function(letter) {
    var self = this;
    self.word.forEach(function(char, index) {
      if (letter === char) {
        self.$spaces.eq(index).text(letter);
        self.correct_spaces++;
      }
    });
  },
  renderIncorrectGuess: function(letter) {
    this.incorrect++;
    this.renderGuess(letter);
    this.setClass();
  },
  renderGuess: function(letter) {
    $("<span />", {
      text: letter
    }).appendTo($guesses);
  },
  setClass: function() {
    $apples.removeClass().addClass("guess_" + this.incorrect);
  },
  processGuess: function(event) {
    var letter = String.fromCharCode(event.which);
    if (notALetter(event.which)) { return; }
    if (this.duplicateGuess(letter)) { return; }
    if ($.inArray(letter, this.word) !== -1) {
      this.fillBlanksFor(letter);
      this.renderGuess(letter);
      if (this.correct_spaces === this.$spaces.length) {
        this.win();
      }
    }       
    else {
      this.renderIncorrectGuess(letter);
    }
    if (this.incorrect === this.guesses) {
      this.lose();
    }
  },
  duplicateGuess: function(letter) {
    var is_duplicate_letter = this.letters_guessed.indexOf(letter) !== -1;
    if (!is_duplicate_letter) { this.letters_guessed.push(letter); }
    return is_duplicate_letter;
  },
  win: function() {
    this.unbind();
    this.displayMessage("You win!");
    this.setGameStatus("win");
  },
  lose: function() {
    this.unbind();
    this.displayMessage("Sorry! You're out of guesses");
    this.setGameStatus("lose");
  },
  emptyGuesses: function() {
    $guesses.find("span").remove();
  },
  displayMessage: function(text) {
    $message.text(text);
  },
  toggleReplay: function(which) {
    $replay.toggle(which);
  },
  unbind: function() {
    $(document).off(".game");
  },
  bind: function() {
    $(document).on("keypress.game", this.processGuess.bind(this));
  },
  setGameStatus: function(status) {
    $(document.body).removeClass();
    if (status) {
      $(document.body).addClass(status);
      this.toggleReplay(true);
    }
  },
  init: function() {
    this.bind();
    this.setClass();
    this.toggleReplay();
    this.emptyGuesses();
    this.createBlanks();
    this.setGameStatus();
    this.displayMessage("");
  }
};

function notALetter(code) {
  var a_code = 97,
      z_code = 122;
  return code < a_code || code > z_code;
}

new GuessAWord();
