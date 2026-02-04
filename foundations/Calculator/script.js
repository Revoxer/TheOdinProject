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
  } else if (symbol === ".") {
    if (secondNumber) {
      if (secondNumber.includes(symbol)) {
        return;
      }
      secondNumber += symbol;
      display.innerText = secondNumber;
    } else if (firstNumber) {
      if (firstNumber.includes(symbol)) {
        return;
      }
      firstNumber += symbol;
      display.innerText = firstNumber;
    } else {
      return;
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

function removeItem() {
  if (secondNumber) {
    const newNumber = secondNumber.slice(0, -1);
    secondNumber = newNumber;
    display.innerText = secondNumber;
  } else if (firstNumber) {
    const newNumber = firstNumber.slice(0, -1);
    firstNumber = newNumber;
    display.innerText = firstNumber;
  } else {
    return;
  }
}

document.addEventListener("keydown", (event) => {
  const key = event.key;

  switch (key) {
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      getSymbol(key);
      break;
    case "+":
    case "-":
    case "*":
    case "/":
      getSymbol(key);
      break;
    case "Enter":
      getResult();
      break;
    case "Escape":
      getClear();
      break;
    case "Backspace":
      removeItem();
      break;
    case ".":
    case ",":
      getSymbol(".");
      break;
    default:
      break;
  }
});
