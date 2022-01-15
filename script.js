/* This is my second attempt at creating a calculator with JavaScript */

/* Select Elements */
// First step is to try defining all elements that should be called with JavaScript
const calculator = document.querySelector(".calculator");
const displays = calculator.querySelectorAll(".calculator-display");
const keys = calculator.querySelector(".calculator-keys");
const memoryCalc = document.querySelector(".memory-calc");
const mainDisplay = document.querySelector(".main-display");
const tempResult = document.querySelector(".temp-result");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const equal = document.querySelector(".equal");
const clearAll = document.querySelector(".clearAll");
const clearLast = document.querySelector(".clearLast");

/* Global scope variables */
// Then create the variables that should be used in the code calcs
let display1Number = "";
let display2Number = "";
let result = null;
let lastOperation = "";
let haveDot = false;
let maxChar = "111111111111111";

//Add event listener to the numbers
numbers.forEach((number) => {
  number.addEventListener("click", (e) => {
    // Prevent more than one decimal dot clicking
    if (e.target.innerText === "." && !haveDot) {
      haveDot = true;
    } else if (e.target.innerText === "." && haveDot) {
      return;
    }
    // Shows input numbers on display concatenated(str)
    display2Number += e.target.innerText; //concatenate input at the variable
    mainDisplay.innerText = display2Number; // show it at the display

    if (mainDisplay.innerText.length > maxChar) {
      mainDisplay.disabled = true;
      return;
    }
  });
});

// Add event listener to the operators
operators.forEach((operator) => {
  operator.addEventListener("click", (e) => {
    // Checks if there is any input at the display
    if (!display2Number) return;
    // Checks if there is a dot at the new input and prevents it from adding multiple dots
    haveDot = false;
    // Set a local variable for the operator input
    const operationName = e.target.innerText;
    // Create the calculation if there is 3 items.
    if (display1Number && display2Number && lastOperation) {
      mathOperation();
      // Parces the input to float and add to result
    } else {
      result = parseFloat(display2Number);
    }
    // Clear operation inputs at the display
    clearVar(operationName);
    lastOperation = operationName;
  });
});

// Add inputs to memoryCalc
function clearVar(name = "") {
  display1Number += display2Number + " " + name + " ";
  //Clear all the displays
  memoryCalc.innerText = display1Number;
  mainDisplay.innerText = "0";
  display2Number = "";
  // Update tempResult variable
  tempResult.innerText = result;
}

// Calculation function
function mathOperation() {
  if (lastOperation === "x") {
    result = parseFloat(result) * parseFloat(display2Number);
  } else if (lastOperation === "+") {
    result = parseFloat(result) + parseFloat(display2Number);
  } else if (lastOperation === "-") {
    result = parseFloat(result) - parseFloat(display2Number);
  } else if (lastOperation === "/") {
    result = parseFloat(result) / parseFloat(display2Number);
  } else if (lastOperation === "%") {
    result = ((parseFloat(result) * parseFloat(display2Number)) / 100).toFixed(
      2
    );
  }
}

equal.addEventListener("click", (e) => {
  // Checks if there is all 2 inputs at the display
  if (!display2Number || !display1Number) return;
  // Checks if there is a dot at the new input and prevents it from adding multiple dots
  haveDot = false;
  //Calls the mathOperation function
  mathOperation();
  //Calls the display clear function
  clearVar();
  mainDisplay.innerText = result;
  tempResult.innerText = "";
  display2Number = result;
  display1Number = "";
});

// Add display clear click event
clearAll.addEventListener("click", (e) => {
  display1Number = "";
  display2Number = "";
  result = "";
  memoryCalc.innerText = "0";
  mainDisplay.innerText = "0";
  tempResult.innerText = "0";
});

// Add display clearLast click event
clearLast.addEventListener("click", (e) => {
  mainDisplay.innerText = "0";
  display2Number = "";
});

//Add click event to keyboard keys numbers
window.addEventListener("keydown", (e) => {
  if (
    e.key === "0" ||
    e.key === "1" ||
    e.key === "2" ||
    e.key === "3" ||
    e.key === "4" ||
    e.key === "5" ||
    e.key === "6" ||
    e.key === "7" ||
    e.key === "8" ||
    e.key === "9" ||
    e.key === "."
  ) {
    //Calls the click function
    clickButtonEl(e.key);

    //Add click event to keyboard keys operators
  } else if (e.key === "+" || e.key === "-" || e.key === "/" || e.key === "%") {
    clickOperation(e.key);
  } else if (e.key === "*") {
    //Calls the click operation function
    clickOperation("x");
    // console.log(e.key)

    //Calls the click equal function
  } else if (e.key == "Enter" || e.key === "=") {
    clickEqual();
  } else if (e.key == "Delete") {
    display1Number = "";
    display2Number = "";
    memoryCalc.innerText = "0";
    mainDisplay.innerText = "0";
    result = "";
    tempResult.innerText = "0";
  }
  // console.log(e.key)
});

//Add click event to keyboard and calls up DOM elements
function clickButtonEl(key) {
  numbers.forEach((button) => {
    if (button.innerText === key) {
      button.click();
    }
  });
}

function clickOperation(key) {
  operators.forEach((operator) => {
    if (operator.innerText === key) {
      operator.click();
    }
  });
}

function clickEqual() {
  equal.click();
}
