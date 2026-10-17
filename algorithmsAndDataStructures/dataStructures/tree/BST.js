const Queue = require('../queue.js');
const Stack = require('../stack/stackWithArray.js');

const errorMessage = {
    emptyData: "Please enter valid data",
    empty: "Tree is empty"
}

class TreeNode {
    constructor(data) {
        if (!data) throw new Error(errorMessage.emptyData);

        this.data = data;
        this.left = null;
        this.right = null;

    }
}

class BST {
    constructor() {
        this.root = null;
    }
    _insert(node, value) {
        if (!node) return new TreeNode(value);

        if (value < node.data) {
            node.left = this._insert(node.left, value);
        } else if (value > node.data) {
            node.right = this._insert(node.right, value);
        }

        return node;
    }

    _contains(node, value) {
        if (!node) return false;
        if (value === node.data) return true;

        if (value < node.data) {
            return this._contains(node.left, value);
        } else if (value > node.data) {
            return this._contains(node.right, value);
        }
    }

    _inOrder(node, result) {
        if (!node) return;
        this._inOrder(node.left, result);
        result.push(node.data);
        this._inOrder(node.right, result);
    }

    _preOrder(node, result) {
        if (!node) return;
        result.push(node.data);
        this._preOrder(node.left, result);
        this._preOrder(node.right, result);
    }

    _postOrder(node, result) {
        if (!node) return;
        this._postOrder(node.left, result);
        this._postOrder(node.right, result);
        result.push(node.data);
    }

    _levelOrder(node, result, level = 0) {
        if (!node) return;

        if (!result[level]) result[level] = [];
        result[level].push(node.data);

        this._levelOrder(node.left, result, level + 1);
        this._levelOrder(node.right, result, level + 1);
    }


    _remove(node, value) {
        if (!node) return null;
        if (value > node.data) {
            node.right = this._remove(node.right, value);
        } else if (value < node.data) {
            node.left = this._remove(node.left, value);
        } else {
            if (!node.left && !node.right) return null;

            if (!node.left || !node.right) return node.left || node.right;

            // Option 1: Use the minimum value from the right subtree
            // let successor = this.getMin(node.right);

            // Option 2: Use the maximum value from the left subtree
            let successor = this.getMax(node.left);

            node.data = successor.data;

            // Option 1: Use the minimum value from the right subtree
            // node.right = this._remove(node.right, successor.data);

            // Option 2: Use the maximum value from the left subtree
            node.left = this._remove(node.left, successor.data);
        }
        return node;
    }

    // Option 1: Use the minimum value from the right subtree
    // getMin(node) {
    //     let curr = node;

    //     while (curr && curr.left) {
    //         curr = curr.left;
    //     }
    //     return curr;
    // }

    // Option 2: Use the maximum value from the left subtree
    getMax(node) {
        let curr = node;

        while (curr && curr.right) {
            curr = curr.right;
        }
        return curr;
    }

    insertRecursive(value) {
        this.root = this._insert(this.root, value);
    }

    containsRecursive(value) {
        return this._contains(this.root, value);
    }

    inOrderIterative() {
        let res = [];
        let stack = new Stack();

        let curr = this.root;

        while (curr || !stack.isEmpty()) {

            while (curr) {
                stack.push(curr);
                curr = curr.left;
            }

            curr = stack.pop();
            res.push(curr.data);
            curr = curr.right;
        }
        return res;
    }

    postOrderIterative() {
        let stack1 = new Stack();
        let stack2 = new Stack();
        stack1.push(this.root);
        let curr = this.root;
        let res = [];

        while (!stack1.isEmpty()) {
            let curr = stack1.pop();
            if (curr.left) stack1.push(curr.left);
            if (curr.right) stack1.push(curr.right);
            stack2.push(curr);
        }

        while (!stack2.isEmpty()) {
            res.push(stack2.pop().data);
        }
        return res;
    }

    preOrderIterative() {
        let res = [];
        let stack = new Stack();
        stack.push(this.root);

        while (!stack.isEmpty()) {
            const curr = stack.pop();

            if (curr.right) stack.push(curr.right);
            if (curr.left) stack.push(curr.left);

            res.push(curr.data);
        }
        return res;
    }

    levelOrderIterative() {
        // let count = 0;
        if (!this.root) throw new Error(errorMessage.empty);
        ;
        let res = [];

        let queue = new Queue();
        queue.enqueue(this.root);

        while (queue.size) {
            let levelSize = queue.size;

            for (let i = 0; i < levelSize; i++) {
                let curr = queue.dequeue();

                res.push(curr.data);
                if (curr.left) queue.enqueue(curr.left);
                if (curr.right) queue.enqueue(curr.right);

            }
            // count++;
        }
        return res;
    }

    levelOrderRecursive() {
        const result = [];
        this._levelOrder(this.root, result);
        return result.flat();
    }

    inOrderRecursive() {
        const result = [];
        this._inOrder(this.root, result);
        return result;
    }

    preOrderRecursive() {
        const result = [];
        this._preOrder(this.root, result);
        return result;
    }

    postOrderRecursive() {
        const result = [];
        this._postOrder(this.root, result);
        return result;
    }

    removeRecursive(value) {
        this.root = this._remove(this.root, value);
    }

    insert(value) {
        let newNode = new TreeNode(value);
        if (!this.root) {
            this.root = newNode;
            return;
        }

        let curr = this.root;
        while (true) {
            if (value < curr.data) {
                if (!curr.left) {
                    curr.left = newNode
                    return;
                } else {
                    curr = curr.left;
                }

            } else if (value > curr.data) {
                if (!curr.right) {
                    curr.right = newNode
                    return;
                } else {
                    curr = curr.right;
                }

            }
        }
    }

    contains(value) {
        if (!this.root) return false;
        let curr = this.root;


        while (curr) {
            if (curr.data === value) return true;

            if (value < curr.data) {
                curr = curr.left
            } else {
                curr = curr.right
            }
        }
        return false;

    }
}


const bst = new BST();

bst.insertRecursive(10);
bst.insertRecursive(5);
bst.insertRecursive(15);
bst.insertRecursive(3);
bst.insertRecursive(7);
bst.insertRecursive(12);
bst.insertRecursive(20);

// // Expected tree:
// //
// //        10
// //       /  \
// //      5    15
// //     / \   / \
// //    3   7 12  20


// console.log(bst.containsRecursive(77));
// console.log(bst.contains(12));
// console.log(bst.preOrderRecursive());
// console.log(bst.preOrderIterative());
// console.log(bst.postOrderRecursive());
// console.log(bst.postOrderIterative());

// bst.removeRecursive(10)
// console.log(bst.inOrderRecursive());
// console.log(bst.levelOrderIterative());
// console.log(bst.levelOrderRecursive());

// console.log(bst.inOrderRecursive());
// console.log(bst.inOrderIterative());
