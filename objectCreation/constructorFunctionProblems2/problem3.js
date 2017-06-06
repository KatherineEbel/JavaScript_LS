// Create a function that can create an object with a given object as its prototype,
// without using Object.create

function createObject(obj) {
  let NewObj = function() {};
  NewObj.prototype = obj;
  return new NewObj();
}

let foo = {
  a: 1
};

let bar = createObject(foo);
console.log(foo.isPrototypeOf(bar));       // true
