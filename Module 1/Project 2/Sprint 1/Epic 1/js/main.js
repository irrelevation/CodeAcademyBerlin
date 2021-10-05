// Basic Exercises

console.log("starting JS...");

// Exercise 1
let myName = "Lukas Zöllner";
console.log(myName);

// Exercise 2
let age = 33;
console.log(age);

// Exercise 3
let juliaAge = 32;
let ageDiff = age - juliaAge;
console.log(ageDiff);

// Exercise 4
if (age > 21) {
  console.log("You are older than 21");
} else {
  console.log("You are not older than 21");
}

// Exercise 5
if (age < juliaAge) {
  console.log("Julia is older than you");
} else if (juliaAge < age) {
  console.log("Julia is younger than you");
} else {
  console.log("You have the same age as Julia");
}

// Array exercises

// Exercise 1
let names = [
  "Annika",
  "Stephan",
  "Anan",
  "Andreas",
  "Lukas",
  "Ottavia",
  "Lucas",
];
names.sort();
console.log(names[0]);
console.log(names[names.length - 1]);
for (const name of names) {
  console.log(name);
}

// Exercise 2
let ages = [29, 32, 28, 31, 33, 30, 29];
let i = 0;
while (i < ages.length) {
  if (ages[i] % 2 === 0) {
    console.log(ages[i]);
  }
  i++;
}

for (let i = 0; i < ages.length; i++) {
  if (ages[i] % 2 === 0) {
    console.log(ages[i]);
  }
}

// Exercise 3
function printLowestNumber(array) {
  const reducer = (previousValue, currentValue) =>
    previousValue < currentValue ? previousValue : currentValue;
  return array.reduce(reducer);
}

// Exercise 4
function printBiggestNumber(array) {
  const reducer = (previousValue, currentValue) =>
    previousValue > currentValue ? previousValue : currentValue;
  return array.reduce(reducer);
}

// Exercise 5
function printElement(array, index) {
  console.log(array[index]);
}

// Exercise 6
// A Multiset is a Set that keeps track of the number of identical elements added to it. It sometimes is called a counter.

// I use Map as the parent class because a Multiset is a map-like object.
// It has key value pairs just like a map with the exception, that its values are numbers, representing the number of times you added an element to the Multiset.
class Multiset extends Map {
  // Just like with a map, we want to be able to initialize a Multiset with an iterable.
  constructor(iterable) {
    //we have to call super() in order to invoke the parent constructor and be able to use "this"
    super();
    // we add all the elements if the iterable to our Multiset.
    for (const element of iterable) {
      this.add(element);
    }
  }

  add(element) {
    // If the map allready has a count for the element we are trying to add
    if (this.has(element)) {
      // we increase the value by 1.
      this.set(element, this.get(element) + 1);
    } else {
      // Otherwise we set the value to 1;
      this.set(element, 1);
    }
  }
}

function printRepeatingElements(array) {
  let multiset = new Multiset(array);
  let repeatingElements = [];
  // to check for repeating elements we check the count of each element in our multiset.
  for (const [element, count] of multiset) {
    // If the count is bigger than 1 it is a duplicate.
    if (count > 1) {
      repeatingElements.push(element);
    }
  }
  // we log the result, giving the .sort() method a sort function, that will sort numbers ascendingly
  console.log(repeatingElements.sort((a, b) => a - b).join());
}

printRepeatingElements([
  3, 6, 67, 6, 23, 11, 100, 8, 93, 0, 17, 24, 7, 1, 33, 45, 28, 33, 23, 12, 99,
  100,
]);

// Exercise 7
myColor = ["Red", "Green", "White", "Black"];
console.log(myColor.join());

// Strings

// Exercise 1
Number.prototype.reverse = function () {
  if (this < 0) {
    return Number(
      `-${String(this * -1)
        .split("")
        .reverse()
        .join("")}`
    );
  }
  return Number(String(this).split("").reverse().join(""));
};

// Exercise 2
String.prototype.sort = function () {
  return this.split("").sort().join("");
};

// Exercise 3
String.prototype.capitalize = function () {
  return this.replaceAll(/\b(.)/g, (match) => match.toUpperCase());
};

console.log("hi, my name is lukas".capitalize());

// Exercise 4
function getLongestWord(phrase) {
  return phrase
    .split(/\b/)
    .reduce((previous, current) =>
      previous.length > current.length ? previous : current
    );
}

console.log(
  getLongestWord(
    "Hello, this is a se  ntence to test if this function returns 'Schifffahrtsgesellschaft."
  )
);
