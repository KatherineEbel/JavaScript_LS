$(function() {
  var answer = getRandomNumber(1, 100);
  var guesses = 0;
  var guess; 

  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * 100 + 1);
  }

  $("form").submit(function(event) {
    event.preventDefault();
    guess = +$("#guess").val();

    guesses += 1;
    var message = "My number is ";
    if (guess > answer) {
      message += "lower than " + guess + "!";
    } else if (guess < answer) {
      message += "higher than " + guess + "!";
    } else if (guess === answer) {
      message = "You Won, and it took you " + guesses + " guesses!";
    }
    $("p").text(message);
  });

  $("a").click(function(event) {
    event.preventDefault();
    $("#guess").val("");
    answer = getRandomNumber(1, 100);
    $("p").text("Guess a number from 1 to 100");
  });
});
