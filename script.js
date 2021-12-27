// Selecting the keys
/* const one = document.querySelector(".one");
one.addEventListener("click", (event) => {
  console.log("hello");
});
*/
const calculator = document.querySelector(".calculator");
const display = calculator.querySelector(".calculator-display");
const keys = calculator.querySelector(".calculator-keys");

keys.addEventListener("click", (event) => {
  if (!event.target.closest("button")) return;

  const key = event.target; //seleciona todo o elemento
  const keyValue = key.textContent; //seleciona o conteúdo(string) do elemento
  const displayValue = display.textContent;

  // Is this a number key?
  if (key.classList.contains("number")) {
    if (displayValue === "0") {
      display.textContent = keyValue;
    } else {
      display.textContent = displayValue + keyValue;
    }
  }

  //Is this an operator key?
  key.dataset.key === "operator";
  key.getAttribute("data-key-type") === "operator";
  if (key.classList.contains("operator")) {
    console.log(key);

    calculator.dataset.previousKeyType = "operator";
  }
});

// Selecting the keys
