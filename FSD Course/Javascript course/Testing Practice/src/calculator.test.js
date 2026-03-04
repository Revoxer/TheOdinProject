import { calculator } from "./calculator.js";

test("add two numbers", () => {
  expect(calculator(1, 2).add()).toBe(3);
});

test("add handles negative numbers", () => {
  expect(calculator(-1, -2).add()).toBe(-3);
});

test("subtract two numbers", () => {
  expect(calculator(2, 1).subtract()).toBe(1);
});

test("subtract handles negative numbers", () => {
  expect(calculator(-2, -1).subtract()).toBe(-1);
});

test("divide two numbers", () => {
  expect(calculator(4, 2).divide()).toBe(2);
});

test("divide handles negative numbers", () => {
  expect(calculator(-4, -2).divide()).toBe(2);
});

test("divide by zero", () => {
  expect(calculator(4, 0).divide()).toBe(null);
});

test("multiply two numbers", () => {
  expect(calculator(4, 2).multiply()).toBe(8);
});

test("multiply handles negative numbers", () => {
  expect(calculator(-4, -2).multiply()).toBe(8);
});
