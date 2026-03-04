import { reverseString } from "./reverseString.js";

test("Reverse string 1", () => {
  expect(reverseString("hello")).toBe("olleh");
});

test("Reverse string 2", () => {
  expect(reverseString("Nice Try")).toBe("yrT eciN");
});
