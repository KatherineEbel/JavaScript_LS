// 1. Write a function named makeMultipleLister that, when invoked and passed a
//    number, returns a function that logs every positive integer multiple of that
//    number less than 100.

/*
function makeMultipleLister(number) {
  return function() {
    var counter = number;
    while (counter < 100) {
      console.log(counter);
      counter += number;
    }
  }
}
var lister = makeMultipleLister(13);
lister();
*/

/*
  2. Write a program that uses two functions, add and
  subtract, to manipulate a running total value. When you invoke either
  function with a number, it should add or subtract that number to the
  running total and log the new total to the console.
*/
// two functions add subtract
// running total value

/*
var total = 0;

function add(number) {
  console.log(total += number);
}

function subtract(number) {
  console.log(total -= number);
}

add(1);
add(42);
subtract(39);
add(6);
*/

// 3. Write a function named later that takes two arguments: a function and an
//  argument for that function. The return value should
//  be a new function that calls the input function with the provided argument

// function later(func, arg) {
//   return function() {
//     func(arg);
//   }
// }

// let logWarning = later(console.log, 'The system is shutting down');
// logWarning()

// 4. Given the following code, 
// How can you set the value of systemStatus to the value of the inner variable 
// status without changing startup in any way?
// answer : not possible this is how private variables are created in functions.
function startup() {
  var status = 'ready';
  return function() {
    console.log('The system is ready.');
  }
}

var ready = startup();