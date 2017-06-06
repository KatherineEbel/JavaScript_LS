// Create a function neww, so that it works like the new operator
function neww(constructor, args) {
  var object = Object.create(constructor.prototype);
  var result = constructor.apply(object, args);
  if (typeof result === 'object' && result !== null) {
    return result; 
  }
  return object;
}

function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

Person.prototype.greeting = function() {
  console.log('Hello, ' + this.firstName + ' ' + this.lastName);
}

var john = neww(Person, ['John', 'Doe']);
john.greeting();          // Hello, John Doe
console.log(john.constructor);         // Person(firstName, lastName) {...}
