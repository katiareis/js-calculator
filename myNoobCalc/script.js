// Selecting only key "one"
/* const one = document.querySelector(".one");
one.addEventListener("click", (event) => {
  console.log("hello");
});
*/

const calculator = document.querySelector(".calculator");
const display = calculator.querySelector(".calculator-display");
const keys = calculator.querySelector(".calculator-keys"); //Selects all the keys

//Selects all the keys
keys.addEventListener("click", (event) => {
  //Narrow the selection
  if (!event.target.closest("button")) return;

  const key = event.target; //selects complete html tag
  const keyValue = key.textContent; //selects the content the the tag(str)
  const displayValue = display.textContent; //selects the content of the display

  // Is this a number key?
  if (key.classList.contains("number")) {
    //Check if the input is not the placeholder 0
    if (displayValue === "0") {
      display.textContent = keyValue; //Shows the tag content in the display
    } else if (keyValue == "C") {
      display.textContent = "0"; //Clear the contents
    } else {
      display.textContent = displayValue + keyValue; //Shows input numbers in the display concatened(str)
    }
  }

  // Is this an operator key?
  if (key.classList.contains("operator")) {
    display.textContent = displayValue + keyValue;
  } else if ((keyValue !== "") & (keyValue === "=")) {
    display.textContent = eval(displayValue);
  }
});
