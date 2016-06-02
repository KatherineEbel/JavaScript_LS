/*
// 1. 
var invoices = {
  unpaid: [],
};

//2. 

invoices.add = function(name, amount) {
  this.unpaid.push({
    name: name,
    amount: amount
  });  
};

// 3.

invoices.totalDue = function() {
  var total = 0;
  for (var i = 0; i < this.unpaid.length; i++) {
    total += this.unpaid[i].amount;
  }
  return total;
};

// 4. 

invoices.add("Due North Development", 250);
invoices.add("Moonbeam Interactive", 187.50);
invoices.add("Slough Digital", 300);

var total_invoices = invoices.totalDue();
console.log(total_invoices);

invoices.paid = [];

invoices.payInvoice = function(name) {
  var remaining = [];
  for (var i = 0; i < this.unpaid.length; i++) {
    if (this.unpaid[i].name === name) {
      this.paid.push(this.unpaid[i]);
    } else {
      remaining.push(this.unpaid[i]);
    }
  }  
  this.unpaid = remaining;
};

console.log(invoices.unpaid);
console.log(invoices.unpaid);
console.log(invoices.paid);

// 6.


invoices.totalPaid = function() {
  var total = 0;
  for (var i = 0; i < this.paid.length; i++) {
    total += this.paid[i].amount;
  }
  return total;
};

// 7. 

invoices.payInvoice("Due North Development");
invoices.payInvoice("Slough Digital");

console.log(invoices.totalPaid());
console.log(invoices.totalDue());
*/

// Object Constructors
function Dog(name, breed, weight) {
  this.name = name;
  this.breed = breed;
  this.weight = weight;
}

function Duck(type, canFly) {
  this.type = type;
  this.canFly = canFly;
}

/*
// Creating a Dog object with constructor
var fido = new Dog("Fido", "Mixed", 38);
var fluffy = new Dog("Fluffy", "Poodle", 30);
var spot = new Dog("Spot", "Chihuahua", 10);
var dogs = [fido, fluffy, spot];

for (var dog in dogs) {
  var size = "small";
  if (dogs[dog].weight > 10) {
    size = "large";
  }
  console.log("Dog: " + dogs[dog].name
               + " is a " + size
               + " " + dogs[dog].breed);
}

*/

// Exercises: The Date Object

function dateSuffix(date) {
  var suffix = "th";
  var date_string = date.toString();
  var digit;

  if (date_string.length === 1) {
    digit = date_string[0];
  } else if (date_string[0] !== "1") {
    digit = date_string[1];
  }

  if (digit === "1") {
    suffix = "st";
  } else if (digit === "2") {
    suffix = "nd";
  } else if (digit === "3") {
    suffix = "rd";
  }

  return date + suffix;
}
var today = new Date();
function formattedDay(date) {
  var days_of_week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days_of_week[date.getDay()];
}

function formattedMonth(date) {
  var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return months[date.getMonth()];
}

function formattedDate(date) {
  var day = formattedDay(date),
      month = formattedMonth(date); 
  console.log("Today's day is " + day + ", " + month + " " + dateSuffix(date.getDate()));
}

// get year returns number of years since 1900
function formattedYear(year) {
  return year.getYear() + 1900;
}

function formattedTime(date) {
  var hours = date.getHours().toString();
  var minutes = date.getMinutes().toString();
  if (hours.length === 1) {
    hours = "0" + hours; 
  } 
  if (minutes.length === 1) {
    minutes = "0" + minutes;
  }    

  return hours + ":" + minutes;
}

formattedDate(today);
console.log(today.getTime());
var tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);
formattedDate(tomorrow);

var next_week = new Date(today.getDate() + 7);
console.log(next_week.toDateString() == today.toDateString());
console.log(formattedTime(today));
