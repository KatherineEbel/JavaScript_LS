// Write a function named greet that takes two arguments
// and logs a greeting:

const partial = (primary, arg1) => {
  return (arg2) => primary(arg1, arg2)
}

const greet = (greeting, name) => {
  console.log(`${greeting[0].toUpperCase() + greeting.slice(1)}, ${name}!`);
}

greet('howdy', 'Joe'); // Howdy, Joe!
greet('good morning', 'Sue'); // Good morning, Sue
// Use a partial function and the greet function to create sayHello and sayHi
// functions that work like

const sayHello = partial(greet, 'hello');
const sayHi = partial(greet, 'hi')
sayHello('Brandon'); // Hello, Brandon!
sayHi('Sarah'); // Hi, Sarah!

