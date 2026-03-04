import { caesarCipher } from "./caesarCipher.js";

test("lowercase code", () => {
  expect(caesarCipher("abc", 3)).toBe("def");
});

test("uppercase code", () => {
  expect(caesarCipher("ABC", 3)).toBe("DEF");
});

test("upper and lower code", () => {
  expect(caesarCipher("HeLLo", 3)).toBe("KhOOr");
});

test("check wrapper code", () => {
  expect(caesarCipher("xyz", 3)).toBe("abc");
});

test("check punctuation code", () => {
  expect(caesarCipher("Hello, World!", 3)).toBe("Khoor, Zruog!");
});
