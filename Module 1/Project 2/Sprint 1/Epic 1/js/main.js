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
// rename helper function, maybe even turn it into a type / constructor
function getMultisetMap(array) {
  let multiset = new Map();
  array.forEach((element) => {
    if (multiset.has(element)) {
      multiset.set(element, multiset.get(element) + 1);
    } else {
      multiset.set(element, 1);
    }
  });
  return multiset;
}

function printRepeatingElements(array) {
  let multiset = getMultisetMap(array);
  let repeatingElements = [];
  for (const [key, value] of multiset) {
    if (value > 1) {
      repeatingElements.push(key);
    }
  }
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
