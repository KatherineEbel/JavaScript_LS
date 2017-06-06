// Problem 4

function Ninja() {
  this.swung = false;
}

let ninjaA = new Ninja();
let ninjaB = new Ninja();

// Add a swing method to the Ninja prototype which
// returns iteself and modifies swung.

Ninja.prototype.swing = function() {
  this.swung = !this.swung;
  return this;
};
console.log(ninjaA.swing().swung);   // this needs to be true
console.log(ninjaB.swing().swung);   // this needs to be true
