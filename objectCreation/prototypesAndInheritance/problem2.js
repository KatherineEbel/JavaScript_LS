// Write a function to provide a shallow copy of an object.
// The copied object should share the same prototype chain
// as the the original object, and it has the same own properties that return
// the same values or objects when accessed.
//

function shallowCopy(object) {
  const propNames = Object.getOwnPropertyNames(object);
  let copy = propNames.reduce((obj, propName) => {
    obj[propName] = object[propName];
    return obj;
  },{});
  Object.setPrototypeOf(copy, object);
  return copy;
}

var foo = {
  a: 1,
  b: 2
};

var bar = Object.create(foo);
bar.c = 3;
bar.say = function() {
  console.log("c is " + this.c);
}

var baz = shallowCopy(bar);
console.log(baz.a);         // 1
baz.say();                  // c is 3
