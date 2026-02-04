const display = document.querySelector(".result");

let firstNumber = "";
let secondNumber = "";
let operator = null;
let result = null;

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) return "Error, divide by zero!";
  return a / b;
}

function operate(operator, firstNumber, secondNumber) {
  const a = Number(firstNumber);
  const b = Number(secondNumber);

  if (operator === "+") return add(a, b);
  else if (operator === "-") return subtract(a, b);
  else if (operator === "*") return multiply(a, b);
  else if (operator === "/") return divide(a, b);
}

function isNumeric(input) {
  return Number.isFinite(+input);
}

function getSymbol(symbol) {
  if (result) {
    getClear();
  }
  if (isNumeric(symbol)) {
    if (operator === null) {
      firstNumber += symbol;
      display.innerText = firstNumber;
    } else {
      secondNumber += symbol;
      display.innerText = secondNumber;
    }
  } else {
    if (firstNumber && operator && secondNumber) {
      const result = operate(operator, firstNumber, secondNumber);
      display.innerText = result;

      firstNumber = result.toString();
      secondNumber = "";
    }
    operator = symbol;
  }
}

function getResult() {
  if (firstNumber && secondNumber && operator) {
    result = operate(operator, firstNumber, secondNumber);
    firstNumber = result;
    display.innerText = result;
  }
}

function getClear() {
  firstNumber = "";
  secondNumber = "";
  operator = null;
  result = null;
  return (display.innerText = "");
}
