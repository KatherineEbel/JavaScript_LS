// Write a function that extends an object (destination object) with contents
// from multiple objects (source objects);
//

function extend(destination) {
  let args = Array.prototype.slice.call(arguments);
  return args.reduce((obj, source) => {
    Object.getOwnPropertyNames(source)
      .forEach(prop => destination[prop] = source[prop]);
    return destination;
  }, destination);
}

var foo = {
  a: 0,
  b: {
    x: 1,
    y: 2
  }
};

var joe = {
  name: 'Joe'
};

var funcs = {
  sayHello() {
    console.log(`Hello, ${this.name}`);
  },
  sayGoodbye() {
    console.log(`Goodbye, ${this.name}`);
  }
};

var object = extend({}, foo, joe, funcs);
console.log(object.b.x); // 1
object.sayHello();      // Hello, Joe
