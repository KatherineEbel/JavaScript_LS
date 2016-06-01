// Exercise 1

var a = "outer";

function testScope() {
  var a = "inner";
  console.log(a);
}

console.log(a); // outer a declared in global scope will be accessed
testScope(); // inner "a" within testScope function will be accessed
console.log(a); // outer a declared in global scope will be accessed

// Exercise 2

var a = "outer";
function testScope() {
  a = "inner";
  console.log(a);
}

console.log(a); // outer
testScope(); // inner 
console.log(a); // inner


// Exercise 3

var basket = "empty";

function goShopping() {
  function shop1() {
    basket = "tv";
  }

  console.log(basket);

  function shop2() {
    basket = "computer";
  }

  function shop3() {
    var basket = "play station";
    console.log(basket);
  }

  shop1();
  shop2();
  shop3();

  console.log(basket);
}

goShopping();
// empty
// play station
// computer
// shop3 function created a local variable basket and assigned play station
// to it. This didn't change the global variable.

// Exercise 4

console.log(a); // undefined
var a = 1;
// on line 63 the variable a is not yet assigned so undefined returned.

// Exercise 6

function hello() {
  a = "hello";
}

hello();
console.log(a); //  hello
// a is not preceded with var so it is moved to global scope and accessible
// everywhere.

// Exercise 7

function hello() {
  var a = "hello";
}

hello();
console.log(a); // a not defined

// Exercise 2:1

function say() {
  if (false) {
    var a = "hello from inside a block";
  }
  console.log(a);
}

say(); // undefined
// variables are scoped only by functions, not blocks. After hoising,
// the code above hoists var a to top of function scope declared, but
// not assigned to any value when it is called.

// Exercise 2:2

function hello() {
  a = "hello";
  console.log(a);

  if (false) {
    var a = "hello again";
  }
}

hello(); // hello
console.log(a); // Uncaught ReferneceError: a is not defined
// There's no global a defined, therefore line 11 gives an error.

// Exercise 2:3

var a = "hello";

for (var i = 0; i < 5; i++) {
  var a = i;
}

console.log(a) // 4
// line 4's variable declaration gets hoisted to the top of the global scope
// for loop does not create new scope since it's a block and not a function.

// Exercise 2:4

var a = 1;

function foo() {
  a = 2;
  function bar() {
    a = 3;
    return 4;
  }
  return bar();
}

console.log(foo()); // 4
console.log(a); // 3

// Exercise 2:5

a = "global";

function checkScope() {
  var a = "local";
  function nested() {
    var a = "nested";
    function supernested() {
      a = "supernested";
      return a;
    }
    return supernested();
  }
  return nested();
}

console.log(checkScope()); // supernested
console.log(a); // global

// Exercise 2:6

var a = "outer";
var b = "outer";
console.log(a); // outer
console.log(b); // outer
setScope(a);
console.log(a); // outer
console.log(b); // inner

function setScope(foo) {
  foo = "inner";
  b = "inner";
}

// Exercise 2:7

var total = 50,
    increment = 15;

function incrementBy(increment) {
  total += increment;
}

console.log(total); // 50
incrementBy(10); 
console.log(total); // 60
console.log(increment); 15

// Exercise 2:8

var a = "outer";
console.log(a); // outer
setScope(a);
console.log(a); //  Uncaught TypeError: setScope is not a function(...)
var setScope = function() {
  a = "inner";
}

// with hoisting the setScope variable declaration gets hoisted to the top,
// but is not assigned when it is called on line 197.

// Immediately Invoked Function Expressions (IIFE)
(function() {
  console.log('hello');
})();

// If the IIFE is not at the beginning of a line, parens can be omited.
var foo = function() {
  return function() {
    return 10;
  }();
}();

console.log(foo); // 10
