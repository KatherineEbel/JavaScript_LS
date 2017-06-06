// What will the following code log out and why?

function Ninja() {
  this.swung = true;
}

let ninja = new Ninja();

Ninja.prototype = {
  swingSword: function() {
    return this.swung;
  }
}

console.log(ninja.swingSword());  // TypeError: ninja.swingSword is not a function

// line 9 sets the the Ninja prototype to a new object, so ninja and Ninja's prototype objects now
// point to different objects, therefore when swingSword is looked up on ninja it is not found;
