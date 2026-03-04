export function analyzeArray(array) {
  const sum = array.reduce((prev, curr) => prev + curr, 0);

  const average = sum / array.length;

  const min = Math.min(...array);

  const max = Math.max(...array);

  const length = array.length;

  object = {
    average: average,
    min: min,
    max: max,
    length: length,
  };

  return object;
}
