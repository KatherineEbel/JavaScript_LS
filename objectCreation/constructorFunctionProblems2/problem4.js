// Create a begetObject function that you can call on any object
// to create an object inherited from it

Object.prototype.begetObject = function() {
  function F() {}
  F.prototype = this;
  return new F();
}
const foo = {
  a: 1
};

let bar = foo.begetObject();
console.log(foo.isPrototypeOf(bar));     // true
