const letters = ['h', 'e', 'l', 'l', 'o'];

function iterateAndLog(array) {
  for (let i = 0; i < array.length; i++) {
    console.log(array[i]);
  }
}
//  a recursive function
  // returns to the previous lvel of recursion when it's gone as far as it can
  // performs a bit of processing.
  // calls itself with a "smaller" argument
function recurseAndLog(array) {
  console.log(array);
  if (array.length > 0) {
    console.log(array[0]);
    recurseAndLog(array.slice(1));
  }
}

// recurseAndLog(letters);

// example of using recursion with the DOM

function walk(node) {
  console.log(node.name);
  for (let i = 0; i < node.childNodes.length; i++) {
    walk(node.childNodes[i]);
  }
}

// walk() calls the Function 'callback' once for each node
function walk(node, callback) {
  callback(node); // do something with node
  for (let i = 0; i < node.childNodes.length; i++) {  // for each child node
    walk(node.childNodes[i], callback); // recursively call walk
  }
}
// walk(document.body)

walk(document.body, (node) => console.log(node.nodeName));  // log nodeName of every Node