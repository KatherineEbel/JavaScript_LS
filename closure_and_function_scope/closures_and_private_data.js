/* Create a makeCounterLogger fuction that takes a number as an argument
*  and returns a function. When we invoke the returned function with a
*  second number, it should count up or down from the first number to the
*  second number, logging each number to the console: */

var makeCounterLogger = function(start) {
  return function(end) {
    var begin = start
    if (begin < end) {
      for (let i = begin; i <= end; i++) {
        console.log(i)
      }
    } else {
      for (let i = begin; i >= end; i--) {
        console.log(i)
      }
    }
  }
}

var countlog = makeCounterLogger(5);
countlog(8);
countlog(2);