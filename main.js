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
      if (node.data === value) return;
      else if (node.data > value) {
        !node.left ? (node.left = newNode) : appendNode(node.left);
      } else !node.right ? (node.right = newNode) : appendNode(node.right);
    }
    appendNode(this.root);
  }
  delete(value) {
    const getThis = this;
    let parentNode = null;
    function findNode(node) {
      if (node.data === value) return node;
      else if (node.data > value && node.left) {
        parentNode = node;
        return findNode(node.left);
      } else if (node.data < value && node.right) {
        parentNode = node;
        return findNode(node.right);
      } else return null;
    }

    function removeNoChild(node) {
      if (!parentNode) this.root = null;
      else if (parentNode.left === node) parentNode.left = null;
      else parentNode.right = null;
    }
    function removeOneChild(node) {
      let grandChild = node.left || node.right;
      if (parentNode.left === node) parentNode.left = grandChild;
      else parentNode.right = grandChild;
    }
    function removeTwoChild(node) {
      let childOfInorderNode = null;

      function appendNode(node, parentNode) {
        if (node.data < parentNode.data) {
          if (!parentNode.left) {
            parentNode.left = node;
          } else appendNode(node, parentNode.left);
        } else {
          if (!parentNode.right) {
            parentNode.right = node;
          } else appendNode(node, parentNode.right);
        }
      }

      function findNextSmallest(node) {
        if (!node.left) {
          childOfInorderNode = node.right;
          return node;
        } else return findNextSmallest(node.left);
      }

      if (!parentNode) {
        childOfInorderNode = findNextSmallest(node.right).right;
        const rootSmallest = new Node(findNextSmallest(node.right).data);
        getThis.delete(findNextSmallest(node.right).data);
        getThis.root = rootSmallest;
        if (node.left) appendNode(node.left, getThis.root);
        if (node.right) appendNode(node.right, getThis.root);
        if (childOfInorderNode) appendNode(childOfInorderNode, getThis.root);
      } else if (parentNode.left === node) {
        childOfInorderNode = findNextSmallest(node.right).right;
        const leftSmallest = new Node(findNextSmallest(node.right).data);
        getThis.delete(findNextSmallest(node.right).data);
        parentNode.left = leftSmallest;
        if (node.left) appendNode(node.left, parentNode);
        if (node.right) appendNode(node.right, parentNode);
        if (childOfInorderNode) appendNode(childOfInorderNode, parentNode);
      } else {
        childOfInorderNode = findNextSmallest(node.right).right;
        const rightSmallest = new Node(findNextSmallest(node.right).data);
        getThis.delete(findNextSmallest(node.right).data);
        parentNode.right = rightSmallest;
        if (node.left) appendNode(node.left, parentNode);
        if (node.right) appendNode(node.right, parentNode);

        if (childOfInorderNode) appendNode(childOfInorderNode, parentNode);
      }
    }
    function deleteNode(node) {
      if (!node) return undefined;
      else if (!node.left && !node.right) removeNoChild(node);
      else if (node.left && node.right) removeTwoChild(node);
      else removeOneChild(node);
      return node;
    }

    return deleteNode(findNode(this.root));
  }

  find(value) {
    function checkNode(node) {
      if (!node) return false;
      else if (node.data === value) return true;
      else if (node.data > value) return checkNode(node.left);
      else return checkNode(node.right);
    }
    return checkNode(this.root);
  }
  levelOrder(callback) {
    let queueArray = [this.root];
    const arrayOfValue = [];
    function traverse() {
      while (queueArray.length > 0) {
        let node = queueArray.shift();
        if (node.left) queueArray.push(node.left);
        if (node.right) queueArray.push(node.right);
        if (!callback) arrayOfValue.push(node.data);
        else callback(node.data);
      }
    }
    traverse();
    if (!callback) return arrayOfValue;
  }
  levelOrderRecursive(callback) {
    const arrayOfValue = [];
    let queueArray = [this.root];
    function traverse(array) {
      const newArray = [];
      for (const node of array) {
        if (!callback) arrayOfValue.push(node.data);
        else callback(node.data);
        if (node.left) queueArray.push(node.left);
        if (node.right) queueArray.push(node.right);
      }
      if (newArray.length > 0) traverse(newArray);
    }
    traverse(queueArray);
    if (!callback) return arrayOfValue;
  }

  depth(value) {
    let depthCounter = 0;
    function checkDepth(node) {
      if (node.data === value) return;
      else if (node.data > value) {
        depthCounter++;
        checkDepth(node.left);
      } else {
        depthCounter++;
        checkDepth(node.right);
      }
    }
    checkDepth(this.root);
    return depthCounter;
  }
  height(value) {
    function findNode(node) {
      if (node.data === value) return node;
      else if (node.data > value && node.left) {
        return findNode(node.left);
      } else if (node.data < value && node.right) {
        return findNode(node.right);
      } else return null;
    }
    let heightCounter = -1;
    function checkHeight(array) {
      const nextLevelArray = [];
      if (array.length <= 0) return;
      else {
        for (let node of array) {
          if (node.left) nextLevelArray.push(node.left);
          if (node.right) nextLevelArray.push(node.right);
        }
        heightCounter++;
        checkHeight(nextLevelArray);
      }
    }
    checkHeight([findNode(this.root)]);
    return heightCounter;
  }
  inorder(callback) {
    const inorderArray = [];
    function inorderTraverse(node) {
      if (!node) return;
      inorderTraverse(node.left);
      if (!callback) inorderArray.push(node.data);
      else callback(node.data);
      inorderTraverse(node.right);
    }
    inorderTraverse(this.root);
    if (!callback) return inorderArray;
  }
  preorder(callback) {
    const preorderArray = [];
    function preorderTraverse(node) {
      if (!node) return;

      if (!callback) preorderArray.push(node.data);
      else callback(node.data);
      preorderTraverse(node.left);
      preorderTraverse(node.right);
    }
    preorderTraverse(this.root);
    if (!callback) return preorderArray;
  }
  postorder(callback) {
    const postorderArray = [];
    function postorderTraverse(node) {
      if (!node) return;
      postorderTraverse(node.left);
      postorderTraverse(node.right);
      if (!callback) postorderArray.push(node.data);
      else callback(node.data);
    }
    postorderTraverse(this.root);
    if (!callback) return postorderArray;
  }

  isBalanced() {
    const leafNodes = [];
    const heights = [];
    function getLeafNodes(node) {
      if (!node) return;
      else if (!node.left && !node.right) leafNodes.push(node.data);
      else {
        getLeafNodes(node.left);
        getLeafNodes(node.right);
      }
    }
    getLeafNodes(this.root);
    leafNodes.forEach((node) => {
      heights.push(this.depth(node));
    });
    const diff = Math.max(...heights) - Math.min(...heights);
    if (diff < 2) return true;
    return false;
  }
  rebalance() {
    this.root = this.buildTree(this.preorder());
  }
}

function createRandomArray() {
  const randomArray = [];
  for (let i = 1; i <= 30; i++) {
    const number = Math.floor(Math.random() * 100);
    randomArray.push(number);
  }
  return randomArray;
}

const testTree = new Tree(createRandomArray());
prettyPrint(testTree.root);
console.log(testTree.isBalanced());
console.log(
  testTree.levelOrder(),
  testTree.levelOrderRecursive(),
  testTree.preorder(),
  testTree.postorder(),
  testTree.inorder()
);

testTree.insert(135531);
testTree.insert(12313);
testTree.insert(9987);
testTree.insert(9098);
testTree.insert(15463);

console.log(testTree.isBalanced());
testTree.rebalance();
console.log(testTree.isBalanced());

console.log(
  testTree.levelOrder(),
  testTree.levelOrderRecursive(),
  testTree.preorder(),
  testTree.postorder(),
  testTree.inorder()
);
