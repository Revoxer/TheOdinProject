import { capitalize } from "./capitalize.js";

test("capitalize 1", () => {
  expect(capitalize("nice")).toBe("Nice");
});

test("capitalize 2", () => {
  expect(capitalize("gOod nIGht")).toBe("Good night");
});
