// Exercises: The Math Object

// Radians to degrees = multiply by 180, divide by 100
function toDegrees(radians) {
  return radians / (Math.PI / 180);
}

// Math.abs

var num = -180;
console.log(Math.abs(num));

// Square root
var find_sqrt = 16777216;
console.log(Math.sqrt(16777216));

// Exponents
console.log(Math.pow(16, 6));

// Rounding Numbers
var a = 50.72,
    b = 49.2,
    c = 49.86;

console.log(Math.floor(a));
console.log(Math.ceil(b));
console.log(Math.round(c));

// Random Number
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

console.log(random(1, 5));
