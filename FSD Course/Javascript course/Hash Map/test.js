import HashMap from "./HashMap.js";

const test = new HashMap();

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

console.log("--- FULL CAPACITY ---");
console.log("Size:", test.length()); // 12
console.log("Capacity:", test.capacity); // 16
console.log("Load:", test.length() / test.capacity); // 0.75

console.log("\n--- OVERWRITING EXISTING NODES ---");
test.set("apple", "green");
test.set("banana", "brown");
console.log("Size after overwrite:", test.length()); // 12
console.log("Capacity after overwrite:", test.capacity); // 16
console.log("apple is now:", test.get("apple")); // green
console.log("banana is now:", test.get("banana")); // brown

console.log("\n--- TRIGGERING RESIZE ---");
test.set("moon", "silver");
console.log("Size after resize:", test.length()); // 13
console.log("Capacity after resize:", test.capacity); // 32
console.log("Load after resize:", test.length() / test.capacity); // ~0.40

console.log("\n--- OVERWRITING AFTER RESIZE ---");
test.set("moon", "gold");
test.set("lion", "orange");
console.log("Size after overwrite:", test.length()); // 13
console.log("Capacity after overwrite:", test.capacity); // 32
console.log("moon is now:", test.get("moon")); // gold
console.log("lion is now:", test.get("lion")); // orange

console.log("\n--- TESTING get() ---");
console.log(test.get("carrot")); // orange
console.log(test.get("unknown")); // null

console.log("\n--- TESTING has() ---");
console.log(test.has("dog")); // true
console.log(test.has("unknown")); // false

console.log("\n--- TESTING remove() ---");
console.log(test.remove("hat")); // true
console.log(test.remove("unknown")); // false
console.log("Size after remove:", test.length()); // 12

console.log("\n--- TESTING keys() ---");
console.log(test.keys()); /// ['moon', 'carrot', 'frog', 'banana', 'grape', 'ice cream', 'jacket', 'kite', 'elephant', 'apple', 'dog', 'lion']

console.log("\n--- TESTING values() ---");
console.log(test.values()); /// ['gold', 'orange', 'green', 'brown', 'purple', 'white', 'blue', 'pink', 'gray', 'green', 'brown', 'orange']

console.log("\n--- TESTING entries() ---");
console.log(test.entries()); /// [[ 'moon', 'gold' ], [ 'carrot', 'orange' ], [ 'frog', 'green' ], [ 'banana', 'brown' ], [ 'grape', 'purple' ], [ 'ice cream', 'white' ], [ 'jacket', 'blue' ], [ 'kite', 'pink' ], [ 'elephant', 'gray' ], [ 'apple', 'green' ], [ 'dog', 'brown' ], [ 'lion', 'orange' ]]

console.log("\n--- TESTING clear() ---");
test.clear();
console.log("Size after clear:", test.length()); // 0
console.log("Keys after clear:", test.keys()); // []
