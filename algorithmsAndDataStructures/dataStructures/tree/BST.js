const errorMessage = {
    emptyData: "Please enter valid data",

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


console.log(bst.containsRecursive(77));
console.log(bst.contains(12));
console.log(bst.preOrderRecursive());
console.log(bst.postOrderRecursive());
console.log(bst.inOrderRecursive());
bst.removeRecursive(10)
console.log(bst.inOrderRecursive());