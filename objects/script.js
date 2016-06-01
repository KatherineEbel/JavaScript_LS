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


