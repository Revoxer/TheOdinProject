export function calculator(a, b) {
  const add = () => {
    return a + b;
  };

  const subtract = () => {
    return a - b;
  };

  const divide = () => {
    if (b === 0) {
      return null;
    } else {
      return a / b;
    }
  };

  const multiply = () => {
    return a * b;
  };

  return { add, subtract, divide, multiply };
}
