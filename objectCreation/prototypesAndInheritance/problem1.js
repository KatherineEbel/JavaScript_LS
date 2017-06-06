// Write a function that returns the object on a given object's prototype
// chain where a property is defined. 

function getDefiningObject(object, propKey) {
  while (object && !object.hasOwnProperty(propKey)) {
    object = Object.getPrototypeOf(object);
  }
  return object;
}

var foo = {
  a: 1,
  b: 2
};

var bar = Object.create(foo);
var baz = Object.create(bar);
var qux = Object.create(baz);

bar.c = 3;
console.log(getDefiningObject(qux, 'c')); // true
console.log(getDefiningObject(qux, 'e'));         // null

