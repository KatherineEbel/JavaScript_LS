// Write a constructor function Circle that takes a radius argument that can
// create circle Objects. You should be able to call an area on the created
// objects to get a circles area.

let Circle = function(radius) {
  this.radius = radius;
};
Circle.prototype.area = function() {
  return this.radius**2 * Math.PI;
};
let a = new Circle(3);
let b = new Circle(4);

console.log(a.area().toFixed(2));   // 28.27
console.log(b.area().toFixed(2));   // 50.27

