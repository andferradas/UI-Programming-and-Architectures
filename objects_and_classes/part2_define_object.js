// Adapted from "Eloquent Javascript Chapter 4 - Data Structures: Objects and Arrays"

//In Javascript you can directly create objects without needing to define a class
let day1 = {
  // These are attributes
  squirrel: false,
  events: ["work", "touched tree", "pizza", "running"],
  // This is a method
  printEvents() {
    console.log(this.events.join(", "));
  }
};

//Attributes exists
console.log("\nTesting Attributes\n")
console.log("Was I a squirrrel on day 1?", day1.squirrel)

console.log("What did I do on day 1?", day1.events)

//Attribute doesn't exist
console.log("Was I a wolf on day 1?", day1.wolf)

//Add a new attribute dynamically
day1.wolf = false

//Now the attribute exists
console.log("Was I wolf on day 1?", day1.wolf)

console.log("\nTesting methods\n")

console.log("Calling printEvents")
day1.printEvents()

//Add a new method dynamically
day1.removeEvent = function(eventToRemove) {
  this.events = this.events.filter(e => e !== eventToRemove)
};

day1.removeEvent("pizza")
console.log("\nCalling printEvents after removing event 'pizza'")
day1.printEvents()