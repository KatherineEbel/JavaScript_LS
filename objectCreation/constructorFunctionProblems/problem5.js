// Create a new instance of an object, without having direct access to the
// constructor function

let ninjaA = (function() {
  function Ninja(){};
  return new Ninja();
})();

// create a ninjaB object
let ninjaB = Object.create(ninjaA);

// alternate solution
// let ninjaB = new ninjaA.constructor();
console.log(ninjaB.constructor === ninjaA.constructor);   // this should be true

