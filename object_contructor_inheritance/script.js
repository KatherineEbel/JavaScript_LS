function Vehicle() {
}

Vehicle.prototype.doors = 4;
Vehicle.prototype.wheels = 4;

var sedan = new Vehicle();
var coupe = new Vehicle();
coupe.doors = 2;
console.log(coupe.hasOwnProperty("doors"));
console.log(sedan.hasOwnProperty("doors"));

function Coupe() {
}

function Motorcycle() {
}

Coupe.prototype = new Vehicle();
Coupe.prototype.doors = 2;
Coupe.constructor = Coupe();
Motorcycle.prototype = new Vehicle();
Motorcycle.prototype.doors = 0;
Motorcycle.prototype.wheels = 2;
Motorcycle.constructor = Motorcycle();
var mustang = new Coupe();
var harley = new Motorcycle();
console.log(mustang instanceof Coupe);
console.log(harley instanceof Motorcycle);

function Sedan() {}
Sedan.prototype = Object.create(Vehicle.prototype);
var sedan = new Sedan();
console.log(sedan instanceof Vehicle);
console.log(sedan instanceof Sedan);
console.log(harley.doors);
