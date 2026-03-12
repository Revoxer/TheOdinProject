class Node {
  constructor(value) {
    this.data = value;
    this.left = null;
    this.right = null;
  }
}

export default class Tree {
  constructor(array) {
    const sorted = [...new Set(array)].sort((a, b) => a - b);
    this.root = this.buildTree(sorted);
  }

  buildTree(array) {
    if (array.length === 0) return null;

    const mid = Math.floor(array.length / 2);

    const newRoot = new Node(array[mid]);
    newRoot.left = this.buildTree(array.slice(0, mid));
    newRoot.right = this.buildTree(array.slice(mid + 1));

    return newRoot;
  }

  includes(value) {
    if (this.root === null) return false;
    let current = this.root;

    while (current !== null) {
      if (current.data === value) return true;
      else if (value < current.data) current = current.left;
      else current = current.right;
    }

    return false;
  }

  insert(value) {
    const newNode = new Node(value);
    if (this.root === null) {
      this.root = newNode;
      return;
    }

    let current = this.root;
    let prev = null;

    while (current !== null) {
      if (current.data === value) return;
      prev = current;
      if (value < current.data) current = current.left;
      else current = current.right;
    }

    if (value < prev.data) prev.left = newNode;
    else prev.right = newNode;
  }

  deleteItem(value) {
    if (this.root === null) return;

    let current = this.root;
    let prev = null;

    while (current !== null && current.data !== value) {
      prev = current;
      if (value < current.data) current = current.left;
      else current = current.right;
    }

    if (current === null) return;

    if (current.left !== null && current.right !== null) {
      let primeSuccessor = current;
      let successor = current.right;

      while (successor.left !== null) {
        primeSuccessor = successor;
        successor = successor.left;
      }

      current.data = successor.data;
      current = successor;
      prev = primeSuccessor;
    }

    const child = current.left !== null ? current.left : current.right;

    if (this.root === current) this.root = child;
    else if (prev.right === current) prev.right = child;
    else prev.left = child;
  }

  levelOrderForEach(callback) {
    if (typeof callback !== "function")
      throw new Error("Callback is required!");

    const queue = [this.root];

    while (queue.length > 0) {
      const node = queue.shift();
      callback(node.data);
      if (node.left !== null) {
        queue.push(node.left);
      }
      if (node.right !== null) {
        queue.push(node.right);
      }
    }
  }

  levelOrderForEachRec(callback, queue = [this.root]) {
    if (typeof callback !== "function")
      throw new Error("Callback is required!");

    if (queue.length > 0) {
      const node = queue.shift();
      callback(node.data);
      if (node.left !== null) {
        queue.push(node.left);
      }
      if (node.right !== null) {
        queue.push(node.right);
      }
      this.levelOrderForEachRec(callback, queue);
    }
  }

  inOrderForEach(callback) {
    if (typeof callback !== "function")
      throw new Error("Callback is required!");

    const node = this.root;

    const inOrder = (node) => {
      if (node === null) return;
      inOrder(node.left);
      callback(node.data);
      inOrder(node.right);
    };

    inOrder(node);
  }

  preOrderForEach(callback) {
    if (typeof callback !== "function")
      throw new Error("Callback is required!");

    const node = this.root;

    const preOrder = (node) => {
      if (node === null) return;
      callback(node.data);
      preOrder(node.left);
      preOrder(node.right);
    };

    preOrder(node);
  }

  postOrderForEach(callback) {
    if (typeof callback !== "function")
      throw new Error("Callback is required!");

    const node = this.root;

    const postOrder = (node) => {
      if (node === null) return;
      postOrder(node.left);
      postOrder(node.right);
      callback(node.data);
    };

    postOrder(node);
  }

  height(value) {
    if (this.root === null) return undefined;

    let current = this.root;

    while (current !== null && current.data !== value) {
      if (value < current.data) current = current.left;
      else current = current.right;
    }

    if (current === null) return undefined;

    const getHeight = (node) => {
      if (node === null) return -1;
      return Math.max(getHeight(node.left), getHeight(node.right)) + 1;
    };

    return getHeight(current);
  }

  depth(value) {
    if (this.root === null) return undefined;
    let current = this.root;

    let count = 0;

    while (current !== null && current.data !== value) {
      if (value < current.data) current = current.left;
      else current = current.right;
      count++;
    }

    if (current === null) return undefined;

    return count;
  }

  isBalanced() {
    const getHeight = (node) => {
      if (node === null) return -1;
      return Math.max(getHeight(node.left), getHeight(node.right)) + 1;
    };

    const balance = (node) => {
      if (node === null) return true;

      const diff = Math.abs(getHeight(node.left) - getHeight(node.right));

      return diff <= 1 && balance(node.left) && balance(node.right);
    };

    return balance(this.root);
  }

  rebalance() {
    const sortedList = [];
    this.inOrderForEach((value) => sortedList.push(value));
    this.root = this.buildTree(sortedList);
  }

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null || node === undefined) return;
    this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
}
