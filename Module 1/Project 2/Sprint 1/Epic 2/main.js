// DOM Manipulation

// Exercise 1
function addBands(bands) {
  let bandlist = document.querySelector("#band-list");
  for (const band of bands) {
    let node = document.createElement("li");
    node.textContent = band;
    bandlist.appendChild(node);
  }
}

addBands(["Dire Straits", "Kansas", "Steely Dan"]);

// Exercise 2
function addMultTable(rows, cols) {
  let parent = document.querySelector("#Exercise-2");
  let table = document.createElement("table");
  parent.appendChild(table);
  let tbody = document.createElement("tbody");
  table.appendChild(tbody);
  for (let i = 0; i < rows; i++) {
    let row = document.createElement("tr");
    for (let j = 0; j < cols; j++) {
      row.appendChild(document.createElement("td"));
    }
    tbody.appendChild(row);
  }
}

addMultTable(5, 10);

// Extra: Function Exercises

// Exercise 1
(() => console.log(9 * 9))();

// Exercise 2
const getResult = () => 9 * 9;
console.log(getResult());

// Exercise 3
const multiply = (a, b) => a * b;
console.log(multiply(1, 1));
console.log(multiply(2, 2));
console.log(multiply(-3, 3));

// Exercises 4
// not sure if my test for "right-angled" actually tests what i think it tests
const determineTypeOfTriangle = (a, b, c) => {
  if (a === b && a === c) {
    return "equilateral";
  } else if (a === b || b === c || a === c) {
    return "isosceles";
  } else if (
    a ** 2 + b ** 2 === c ** 2 ||
    a ** 2 + c ** 2 === b ** 2 ||
    b ** 2 + c ** 2 === a ** 2
  ) {
    return "right-angled";
  } else {
    return "scalene";
  }
};

console.log(determineTypeOfTriangle(5, 5, 5));
console.log(determineTypeOfTriangle(1, 1.2, 1));
console.log(determineTypeOfTriangle(5, 3, 4));
console.log(determineTypeOfTriangle(100, 11, -5));

// Exercise 5
function replaceABy1(arrayOfCharacters) {
  return arrayOfCharacters.map((char) => (char === "a" ? "1" : char));
}

// Exercise 6
const add = (numbers) =>
  numbers.reduce((previous, current) => previous + current);

console.log(add([1, 2, 3, 4, 5]));

const smallestNumber = (numbers) =>
  numbers.reduce((previous, current) =>
    previous < current ? previous : current
  );

console.log(smallestNumber([1, 2, 3, 4, 5, -7, 11]));

// Exercise 7
const addEvenNumbers = (numbers) =>
  numbers.reduce(
    (previous, current) => (current % 2 === 0 ? previous + current : previous),
    0
  );

console.log(addEvenNumbers([1, 2, 3, 4, 5, 6]));
console.log(addEvenNumbers([0, 1, 3, 5, 0]));

// Exercise 8
// implementation
const addEvenIndexes = (numbers) =>
  numbers.reduce(
    (previous, current, index) =>
      index % 2 === 0 && index > 0 ? previous + current : previous,
    0
  );

console.log(addEvenIndexes([2, 3, 4, 5, 6]));
console.log(addEvenIndexes([-2, 3, 1]));

// Exercises 9
function evenNumbersBefore(number) {
  let result = [];
  for (let i = 2; i < number; i += 2) {
    result.push(i);
  }
  return result.join();
}

console.log(evenNumbersBefore(9));

// Exercise 10
const oddNumbersBetween = (a, b) => {
  let result = [];
  for (let i = a < b ? a : b; i <= (a < b ? b : a); i++) {
    if (Math.abs(i % 2) === 1) {
      result.push(i);
    }
  }
  return result.join();
};

console.log(oddNumbersBetween(-10, 15));