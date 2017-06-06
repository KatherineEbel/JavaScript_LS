// What will the following code log out and why?

function Ninja() {
  this.swung = true;
}

let ninja = new Ninja();

Ninja.prototype.swingSword = function() {
  return this.swung;
};

console.log(ninja.swingSword());  // logs true

// logs true because swingSword because ninja was created with Ninja's constructor function which sets
// ninja's prototype to Ninja's prototype. so ninja will inherit any properties that are added to Ninja's
// prototype.
