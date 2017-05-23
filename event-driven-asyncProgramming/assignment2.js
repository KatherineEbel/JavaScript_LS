// In what order will the following lines of code execute? Number them to indicate the order
// of execution.
//setTimeout(function() {  // 1
//  console.log("Once");   // 5
//}, 1000);
//setTimeout(function() { // 2
//  console.log("Once");  // 7
//}, 3000);
//setTimeout(function() { // 3
//  console.log("Once");  // 6
//}, 2000);
//setTimeout(function() { //4
//  console.log("Once");  //8
//}, 4000);


// In what order will the following lines of code run?
//setTimeout(function() {
  //setTimeout(function() {
    //q();                    // 7
  //}, 15);

  //d();                       // 3

  //setTimeout(function() {
    //n();                    // 5
  //}, 5);

  //z();                    // 4
//}, 10);

//setTimeout(function() {
  //s();                    // 6
//}, 20);

//setTimeout(function() {
  //f();                    // 2
//});

//g();                      // 1
// g(), f(), d(),z(), n(), s(), q()

// Write a function afterNSeconds, that takes two arguments: a callback and
// a number of seconds to wait. The callback should be run after the
// specified number of seconds.

const afterNSeconds = (callback, numberOfSeconds) => {
  setTimeout(callback, numberOfSeconds * 1000);
};

// Write a function startCounting that causes a number to be logged to the
// console every second. Each number should be one larger than the number
// before it.

const startCounting = () => {
  let counter = 1;
  return setInterval(() => {
    console.log(counter);
    counter++;
  }, 1000);
};

const stopCounting = (intervalID) => {
  clearInterval(intervalID);
};
startCounting();
