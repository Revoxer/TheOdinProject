export default class LinkedList {
  constructor() {
    this.headNode = null;
  }

  append(value) {
    const newNode = new Node(value);

    if (this.headNode === null) {
      this.headNode = newNode;
      return;
    }

    let current = this.headNode;
    while (current.nextNode !== null) {
      current = current.nextNode;
    }
    current.nextNode = newNode;
  }

  prepend(value) {
    const newNode = new Node(value);
    newNode.nextNode = this.headNode;
    this.headNode = newNode;
  }

  size() {
    let count = 0;
    let current = this.headNode;
    while (current !== null) {
      count++;
      current = current.nextNode;
    }
    return count;
  }

  head() {
    return this.headNode ? this.headNode.value : undefined;
  }

  tail() {
    if (!this.headNode) return undefined;
    let current = this.headNode;
    while (current.nextNode !== null) {
      current = current.nextNode;
    }
    return current.value;
  }

  at(index) {
    let current = this.headNode;
    let i = 0;
    while (current !== null) {
      if (i === index) return current.value;
      current = current.nextNode;
      i++;
    }
    return undefined;
  }

  pop() {
    if (!this.headNode) return undefined;
    const value = this.headNode.value;
    this.headNode = this.headNode.nextNode;
    return value;
  }

  contains(value) {
    let current = this.headNode;
    while (current !== null) {
      if (current.value === value) return true;
      current = current.nextNode;
    }
    return false;
  }

  findIndex(value) {
    let current = this.headNode;
    let i = 0;
    while (current !== null) {
      if (current.value === value) return i;
      current = current.nextNode;
      i++;
    }
    return -1;
  }

  toString() {
    if (!this.headNode) return "";

    let result = "";
    let current = this.headNode;
    while (current !== null) {
      result += `( ${current.value} ) -> `;
      current = current.nextNode;
    }
    return result + "null";
  }

  insertAt(index, ...values) {
    if (index < 0) throw new RangeError();

    if (index === 0) {
      let current = this.headNode;

      values.reverse().forEach((value) => {
        const newNode = new Node(value);
        newNode.nextNode = current;
        current = newNode;
      });

      this.headNode = current;
      return;
    }

    let current = this.headNode;
    let i = 0;

    while (current !== null) {
      if (i === index - 1) {
        const nextNodeElement = current.nextNode;

        values.forEach((value) => {
          const newNode = new Node(value);
          current.nextNode = newNode;
          current = newNode;
        });

        current.nextNode = nextNodeElement;
        return;
      }

      current = current.nextNode;
      i++;
    }

    throw new RangeError();
  }

  removeAt(index) {
    if (index < 0) throw new RangeError();
    if (!this.headNode) throw new RangeError();

    let current = this.headNode;

    if (index === 0) {
      this.headNode = current.nextNode;
      return;
    }

    let i = 0;
    while (current !== null) {
      if (i === index - 1) {
        if (!current.nextNode) throw new RangeError();
        current.nextNode = current.nextNode.nextNode;
        return;
      }
      current = current.nextNode;
      i++;
    }
    throw new RangeError();
  }
}

class Node {
  constructor(value = null, nextNode = null) {
    this.value = value;
    this.nextNode = nextNode;
  }
}
