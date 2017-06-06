// 1. Create an object called shape that has a type property and a getType method.
// 2. Define a Triangle constructor function whose prototype is shape. Objects created
//    with Triangle should have three own properties: a, b, and c representing the sides of a triangle
// 3. Add a new method to the prototype called getPerimeter.

const shape = {
  type: "shape",
  getType() {
    return this.type;
  }
};

const Triangle = function(a, b, c) {
  this.a = a;
  this.b = b;
  this.c = c;
  this.type = "triangle";
};

Triangle.prototype = shape;
Triangle.prototype.getPerimeter = function() {
  return this.a + this.b + this.c;
};
Triangle.prototype.constructor = Triangle;

let t = new Triangle(1, 2, 3);
console.log(t.constructor);                  // Triangle(a, b, c)
console.log(shape.isPrototypeOf(t));         // true
console.log(t.getPerimeter());               // 6
console.log(t.getType());                    // "triangle"
