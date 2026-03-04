const lowercase = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

const uppercase = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

export function caesarCipher(text, number) {
  let letters = text.split("");
  let newArray = [];

  function checkIndex(index) {
    if (index > 25) {
      return index - 26;
    } else {
      return index;
    }
  }

  letters.forEach((letter) => {
    if (lowercase.includes(letter)) {
      const index = lowercase.indexOf(letter);

      const newIndex = checkIndex(index + number);

      const newLetter = lowercase[newIndex];

      newArray.push(newLetter);
    } else if (uppercase.includes(letter)) {
      const index = uppercase.indexOf(letter);

      const newIndex = checkIndex(index + number);

      const newLetter = uppercase[newIndex];

      newArray.push(newLetter);
    } else {
      newArray.push(letter);
    }
  });

  return newArray.join("");
}
