export function capitalize(text) {
  let firstLetter = text.slice(0, 1).toUpperCase();
  let otherLetter = text.slice(1).toLowerCase();

  return firstLetter + otherLetter;
}
