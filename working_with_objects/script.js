var me = {
  firstName: "Jane",
  lastName: "Doe"
};

/*function fullName(person) {
  console.log(person.firstName + " " + person.lastName);
}*/

var friend = {
  firstName: "John",
  lastName: "Smith"
};

var mother = {
  firstName: "Amber",
  lastName: "Doe"
};

var father = {
  firstName: "Shane",
  lastName: "Doe"
};

var people = {
  lastIndex: 0,
  collection: [],
  fullName: function(person) {
    console.log(person.firstName + " " + person.lastName);
  },
  rollCall: function() {
    this.collection.forEach(this.fullName);
  },
  add: function(person) {
    if (this.isInvalidPerson(person)) { return; }
    this.collection.push(person);
    person.index = this.lastIndex + 1;
    this.lastIndex += 1;
  },
  remove: function(person) {
    if (this.isInvalidPerson(person)) { return; }
    var index = this.getIndex(person),
        leftSide, rightSide;
    if (index === -1) { return; }

    leftSide = this.collection.slice(0, index);
    rightSide = this.collection.slice(index + 1);
    this.collection = leftSide.concat(rightSide);
    console.log(index);
  },
  getIndex: function(person) {
    var index = -1;
    this.collection.forEach(function(comparator, i) {
      if (comparator.firstName === person.firstName && comparator.lastName === person.lastName) {
        index = i;
      }
    });
    return index;
  },
  isInvalidPerson: function(person) {
    return typeof person.firstName !== "string" || typeof person.lastName !== "string";
  },
  get: function(person) {
    if (this.isInvalidPerson(person)) { return; }
    return this.collection[this.getIndex(person)];
  },
  update: function(person) {
    if (this.isInvalidPerson(person)) { return; }
    var existingPersonId = this.getIndex(person);

    if (existingPersonId === -1) { this.add(person); }
    else { this.collection[existingPersonId] = person; }
  },
};

/*
function rollCall(collection) {
  collection.forEach(fullName);
}

console.log(people.getIndex(friend));
people.remove(friend);
console.log(people.getIndex(friend));
*/

people.add(me);
people.add(friend);
people.add(mother);
people.add(father);
console.log(people.get(mother));
