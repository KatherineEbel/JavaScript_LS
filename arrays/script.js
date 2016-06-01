var friends = ["Bob", "Josie", "Sam"],
    enemies = ["Bob", "Josie", "Sam"];

console.log(friends == enemies);
// The two arrays are not equal because they are two different arrays
// that happen to contain the same three values.

var friends_clone = friends;
console.log(friends_clone == friends);

// Exercise 3

function lastInArray(array) {
  return array[array.length - 1];
}

console.log(lastInArray(friends));

// Exercise 4

var first_names = ["Steve", "Martha", "Pat"];

function rollCall(names) {
  for (var i = 0; i < names.length; i++) {
    console.log(names[i]);
  }
}

rollCall(first_names);

// Exercise 5

var numbers = [1, 2, 3, 4, 5];

function reverse(values) {
  var reversed = [];
  for (var i = values.length - 1; i >= 0 ; i--) {
    reversed.push(values[i]);
  }
  return reversed;
}

console.log(reverse(numbers));

// Exercise 6

function findFirst(value, array) {
  var position = -1;
  for (var i = 0; i < array.length; i++) {
    if (array[i] === value) {
      position = i;
      break;
    }
  }
  return position;
}

console.log(findFirst(2, [1, 2, 3]));
console.log(findFirst(9, [1, 2, 3]));

// Exercise 7

function arrayToString(array) {
  var string = "";
  for (var i = 0; i < array.length; i++) {
    string += array[i] + " ";  
  }
  return string;
}

console.log(arrayToString(["This", "is", "a", "sentence."]));

// Exercises: Basic Array Uses

// 1. Write a function that will return the first element of an
// array that is passed to it as a parameter.

function firstElementOf(arr) {
  return arr[0];
}

firstElementOf(["U", "S", "A"]); // Returns "U"

// 2. Write a function that will return the last element of an array that is passed to it as a parameter.

function lastElementOf(arr) {
  return arr[arr.length - 1];
}

lastElementOf(["U", "S", "A"]); // Returns "A"

// 3. Write a function that will accept two arguments, an array and an
// integer representing the position of the element to be returned by
// the function. What happens when we pass an index greater than the lenght
// of the array? What about a negative number?

function nthElementOf(arr, index) {
  return arr[index];
}

var digits = [4, 8, 15, 16, 23, 42];
// console.log(nthElementOf(digits, 3)); // Returns 16
// console.log(nthElementOf(digits, 8)); // undefined
// console.log(nthElementOf(digits, -1)); // undefined

// 4. Can we add data into an array at a negative index?
// If so, why is this possible?
digits[-1] = 10;
// console.log(nthElementOf(digits, -1));
// console.log(digits[-1]);
// console.log(digits["-1"]);

// console.log(digits);
// Yes. Arrays are objects.

// 5. Write a function that accepts an array as the first argument and a number as the second.
// Return a new array of elements that go from the first element and 
// selects elements up to that count. Passing 3, for example, would
// return the first 3 elements of an array.

function firstNOf(arr, length) {
  return arr.slice(0, length);
}

var digits = [4, 8, 15, 16, 23, 42];
// console.log(firstNOf(digits, 3)); // returns [4, 8, 15]

// 6 and 7. Write a function like the previous one, except return
// the last n elements as a new array.

function lastNOf(arr, length) {
  var index = arr.length - length;
  if (index < 0) {
    index = 0;
  }
  return arr.slice(index);
}

// console.log(lastNOf(digits, 3)); // Returns [16, 23, 42]

// 8. Write a function that accepts two arrays as arguments and returns
// an array with the first element in the first array as well as the last
// element in the second array.

function endsOf(beginning_arr, ending_arr) {
  var result = [];
  result.push(beginning_arr[0]);
  result.push(ending_arr[ending_arr.length - 1]);
  return result;
}

// console.log(endsOf([4, 8, 15], [16, 23, 24])); // Returns [4, 24]

// Exercises: Intermediate Array Uses

// 1. Write a function that returns a new array of the elements in odd positions
// of an array parameter.

function oddElementsOf(arr) {
  var odds = [];
  for (var i = 1; i < arr.length; i+= 2) {
    odds.push(arr[i]);
  }
  return odds;
}

var digits = [4, 8, 15, 16, 23, 42];
console.log(oddElementsOf(digits)); // Returns [8, 16, 42]

// 2. Write a function that accepts two arrays and returns a new array whose
// even positions are from the first array and odd positions are from the
// second array. Assume both arrays are equal length.

function combinedArray(even, odd) {
  var combined = [];
  for (var i = 0; i < even.length; i++) {
    combined.push(even[i]);
    combined.push(odd[i]);
  }
  return combined;
}

var letters = ["A", "L", "V", "A", "R", "H"];
// console.log(combinedArray(digits, letters));  // Returns [4, "A", "8", "L"
//, 15, "V", 16, "A", 23, "R", 42, "H"]

// 3. Write a function that returns a new array that contains a combination
// of the existing array elements as-is and the array elements in reverse order.

function combineAndReverse(arr) {
  return arr.concat(arr.slice().reverse());
}

// console.log(combineAndReverse(digits));

// 4. Write a function that accepts an array and a string. The function should
// return a string of the array elements joined together with the string
// used to join the elements together. An array ["a", "b", "c"] and a string
// "+" should return "a+b+c". If no joining string is passed use an empty
// string.

function joinArray(arr, joiner) {
  return arr.join(joiner || '');
}

// console.log(joinArray(["a", "b", "c"], "+")); // Returns "a+b+c"
// console.log(joinArray([1, 4, 1, 5, 9, 2, 7])); // Returns "1415927"

// 5. Using the array sort method, create a function that accepts
// an array of numbers and returns a new array of numbers sorted in
// descending order.

function sortDescending(arr) {
  return arr.sort(function(a, b) {
    return b - a;
  });
}

// console.log(sortDescending([23, 4, 16, 42, 8, 15]));

// 6. Write a function that accepts an array of arrays and returns
// a new array containing the sums of each of the sub arrays.

function matrixSums(arr) {
  var sums = [];
  for (var i = 0; i < arr.length; i++) {
    var sum = arr[i].reduce(function(a, b) {
      return a + b;
    });
    sums.push(sum);
  }
  return sums;
}

// console.log(matrixSums([[2, 8, 5], [12, 48, 0], [12]])); // Returns [15, 60, 12]

// 7. Write a function that takes an array and returns a new
// array with duplicate elements removed.
function uniqueElements(arr) {
  return arr.filter(function(elem, pos) {
    return arr.indexOf(elem) == pos;
  });    
}

console.log(uniqueElements([1, 2, 4, 3, 4, 1, 5, 4])); // Returns [1, 2, 3, 4, 5]

