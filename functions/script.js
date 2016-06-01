function average(array) {
  return sum(array) / array.length;
}

function sum(array) {
  var total = 0;
  for (var i = 0; i < array.length; i++) {
    total += array[i];
  }
  return total;
}

var arr = [1, 12, 24, 30, 16];
console.log(average(arr));

var temperatures = [68, 90, 85, 72, 75];
console.log(average(temperatures));

// Exercise 6 - FizzBuzz
function fizzbuzz() {
  var msg;
  for (var i = 1; i < 100; i++) {
    msg = "";
    if (i % 3 === 0) { msg = "Fizz"; }
    if (i % 5 === 0) { msg += "Buzz"; }
    console.log(msg || i);
  }
}

// console.log(fizzbuzz());

// Exercise 7 - MaxRandom
function random(max_integer) {
  return Math.ceil(Math.random() * max_integer);
}

console.log(random(50));
