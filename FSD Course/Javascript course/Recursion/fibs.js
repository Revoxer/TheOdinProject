// 1. ITERATION
function fibs(n) {
  if (n <= 0) return [];
  if (n === 1) return [0];

  const result = [0, 1];
  for (let i = 2; i < n; i++) {
    result.push(result[i - 1] + result[i - 2]);
  }
  return result;
}

// 2. RECURSIVELY
function fibsRec(n) {
  if (n <= 0) return [];
  if (n === 1) return [0];
  if (n === 2) return [0, 1];

  const prev = fibsRec(n - 1);
  const nextVal = prev[prev.length - 1] + prev[prev.length - 2];
  return [...prev, nextVal];
}

// 3. TESTS
console.log("=== fibs (iteration) ===");
console.log(fibs(1)); // [0]
console.log(fibs(2)); // [0, 1]
console.log(fibs(5)); // [0, 1, 1, 2, 3]
console.log(fibs(8)); // [0, 1, 1, 2, 3, 5, 8, 13]
console.log(fibs(0)); // []

console.log("=== fibsRec (recursively) ===");
console.log(fibsRec(1)); // [0]
console.log(fibsRec(2)); // [0, 1]
console.log(fibsRec(5)); // [0, 1, 1, 2, 3]
console.log(fibsRec(8)); // [0, 1, 1, 2, 3, 5, 8, 13]
console.log(fibsRec(0)); // []
