const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

function mergeSort(arr) {
  function splitFirst(arr) {
    if (arr.length === 1) return arr;
    const firstHalf = arr.slice(0, Math.round(arr.length / 2));
    return mergeSort(firstHalf);
  }

  function splitSecond(arr) {
    if (arr.length === 1) return arr;
    const secondHalf = arr.slice(Math.round(arr.length / 2));
    return mergeSort(secondHalf);
  }
  function merge(a, b) {
    let arraySorted = [];
    while (a.length > 0 || b.length > 0) {
      if (a[0] <= b[0] || b[0] === undefined) {
        arraySorted.push(a.shift());
      } else arraySorted.push(b.shift());
    }
    return arraySorted;
  }

  return merge(splitFirst(arr), splitSecond(arr));
}

function mySort(arr) {
  arrSorted = mergeSort(arr);
  const arrayMapped = [];
  arrSorted.forEach((element) => {
    if (element !== arrayMapped[arrayMapped.length - 1]) {
      arrayMapped.push(element);
    }
  });
  return arrayMapped;
}

const testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    const arraySorted = mySort(array);
    function balancedTree(array, start, end) {
      if (start > end) return null;
      const mid = Math.ceil((start + end) / 2);
      const node = new Node(array[mid]);

      node.left = balancedTree(array, start, mid - 1);
      node.right = balancedTree(array, mid + 1, end);
      return node;
    }
    return balancedTree(arraySorted, 0, arraySorted.length - 1);
  }
  insert(value) {
    const newNode = new Node(value);
    function appendNode(node) {
      if (node.data > value) {
        !node.left ? (node.left = newNode) : appendNode(node.left);
      } else !node.right ? (node.right = newNode) : appendNode(node.right);
    }
    appendNode(this.root);
  }
  delete(value) {
    function findNode(node) {
      if (node.data === value) return node;
      else if (node.data > value) return findNode(node.left);
      else return findNode(node.right);
    }

    function removeNoChild(node) {
      
    }
    function removeOneChild(node) {

    }
    function removeTwoChild(node) {

    }
    function deleteNode(node) {
      if (!node.left && !node.right) removeNoChild(node);
      else if (node.left && node.right) removeOneChild(node);
      else removeTwoChild(node);
    }

    deleteNode(findNode(this.root));
  }
}

const testTree = new Tree(testArray);

prettyPrint(testTree.root);
testTree.insert(26);
prettyPrint(testTree.root);
