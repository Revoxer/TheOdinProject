import Tree from "./BST.js";

const randomArray = Array.from({ length: 20 }, () =>
  Math.floor(Math.random() * 100),
);

const tree = new Tree(randomArray);

console.log(tree.isBalanced());

const levelOrder = [];
tree.levelOrderForEach((value) => levelOrder.push(value));
console.log(levelOrder);

const inOrder = [];
tree.inOrderForEach((value) => inOrder.push(value));
console.log(inOrder);

const preOrder = [];
tree.preOrderForEach((value) => preOrder.push(value));
console.log(preOrder);

const postOrder = [];
tree.postOrderForEach((value) => postOrder.push(value));
console.log(postOrder);

tree.insert(150);
tree.insert(200);
tree.insert(300);

console.log(tree.isBalanced());

tree.rebalance();

console.log(tree.isBalanced());

const levelOrder2 = [];
tree.levelOrderForEach((value) => levelOrder2.push(value));
console.log(levelOrder2);

const inOrder2 = [];
tree.inOrderForEach((value) => inOrder2.push(value));
console.log(inOrder2);

const preOrder2 = [];
tree.preOrderForEach((value) => preOrder2.push(value));
console.log(preOrder2);

const postOrder2 = [];
tree.postOrderForEach((value) => postOrder2.push(value));
console.log(postOrder2);
