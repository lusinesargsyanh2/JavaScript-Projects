const errorMessage = {
    emptyData: "Please enter valid data",
    empty: "Tree is empty"
}

class AvlNode {
    constructor(data) {
        if (data === null || data === undefined) throw new Error(errorMessage.emptyData);

        this.data = data;
        this.left = null;
        this.right = null;
        this.height = 1;
    }
}

class AVL {
    constructor(value) {
        this.root = value === undefined || value === null ? null : new AvlNode(value);
    }

    _bf(node) { // balance factor
        if (!node) return 0;

        return node ? this._getHeight(node.left) - this._getHeight(node.right) : 0;
    }

    _getHeight(node) {
        return node ? node.height : 0;
    }

    _update(node) { // update height
        node.height = 1 + Math.max(this._getHeight(node.left), this._getHeight(node.right));
    }
    _getMin(node) {
        let curr = node;

        while (curr && curr.left) {
            curr = curr.left;
        }
        return curr;
    }
    _rightRotate(y) {
        let x = y.left;
        let T1 = x.right;

        x.right = y;
        y.left = T1;

        this._update(y);
        this._update(x);

        return x;
    }

    _leftRotate(y) {
        let x = y.right;
        let T1 = x.left;

        x.left = y;
        y.right = T1;

        this._update(y);
        this._update(x);

        return x;
    }

    _insert(node, value) {
        if (!node) return new AvlNode(value);

        if (value < node.data) {
            node.left = this._insert(node.left, value);
        } else if (value > node.data) {
            node.right = this._insert(node.right, value);
        } else {
            return node;
        }

        this._update(node);
        let bf = this._bf(node);

        if (bf > 1 && value < node.left.data) {
            return this._rightRotate(node);
        } else if (bf > 1 && value > node.left.data) {
            node.left = this._leftRotate(node.left);
            return this._rightRotate(node);
        } else if (bf < -1 && value > node.right.data) {
            return this._leftRotate(node);
        } else if (bf < -1 && value < node.right.data) {
            node.right = this._rightRotate(node.right);
            return this._leftRotate(node);
        }

        return node;
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

    _preOrder(node, result) {
        if (!node) return;
        this._preOrder(node.left, result);
        this._preOrder(node.right, result);
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

            let successor = this._getMin(node.right);

            node.data = successor.data;

            node.right = this._remove(node.right, successor.data);
        }

        this._update(node);
        let bf = this._bf(node);

        // if (bf > 1 && value > node.data) {
        //     return this._rightRotate(node);
        // } else if (bf < -1 && value < node.data) {
        //     return this._leftRotate(node)
        // }

        if (bf > 1 && this._bf(node.left) >= 0) {
            console.log("R");

            return this._rightRotate(node);
        } else if (bf > 1 && this._bf(node.left) < 0) {
            node.left = this._leftRotate(node.left);
            return this._rightRotate(node);
        } else if (bf < -1 && this._bf(node.right) <= 0) {
            return this._leftRotate(node);
        } else if (bf < -1 && this._bf(node.right) > 0) {
            node.right = this._rightRotate(node.right);
            return this._leftRotate(node);
        }
        return node;
    }

    insert(value) {
        this.root = this._insert(this.root, value);
    }

    levelOrder() {
        const result = [];
        this._levelOrder(this.root, result);
        return result.flat();
    }

    inOrder() {
        const result = [];
        this._inOrder(this.root, result);
        return result;
    }

    preOrder() {
        const result = [];
        this._preOrder(this.root, result);
        return result;
    }

    preOrder() {
        const result = [];
        this._preOrder(this.root, result);
        return result;
    }

    remove(value) {
        this.root = this._remove(this.root, value);
    }

    printTree(node = this.root, prefix = "", isLeft = true) {
        if (!node) return;

        if (node.right) {
            this.printTree(
                node.right,
                prefix + (isLeft ? "│   " : "    "),
                false
            );
        }

        console.log(
            `${prefix}${node.data} [H:${node.height}, BF:${this._bf(node)}]`
        );

        if (node.left) {
            this.printTree(
                node.left,
                prefix + (isLeft ? "    " : "│   "),
                true
            );
        }
    }


}

// const bst = new AVL(); 

// 1. LL rotation
// [30, 20, 10].forEach(value => bst.insert(value));

// 2. RR rotation
// [10, 20, 30].forEach(value => bst.insert(value));

// // 3. LR rotation
// [30, 10, 20].forEach(value => bst.insert(value));

// // 4. RL rotation
// [10, 30, 20].forEach(value => bst.insert(value));

// // 5. Ascending order
// [1, 2, 3, 4, 5, 6, 7].forEach(value => bst.insert(value));

// // 6. Descending order
// [7, 6, 5, 4, 3, 2, 1].forEach(value => bst.insert(value));

// // 7. Random order
// [50, 30, 70, 20, 40, 60, 80, 10, 25].forEach(value => bst.insert(value));

// // 8. Duplicate values
// [10, 20, 10, 30, 20].forEach(value => bst.insert(value));

// console.log(bst.inOrder());
// bst.printTree(); 


 
// //////////////// REMOVE TEST
// const bst = new AVL();

// [30, 40, 20, 10].forEach(v => bst.insert(v));
// bst.remove(40);
// [30, 40, 20, 25].forEach(v => bst.insert(v));
// bst.remove(40);
// [10,5,20,25].forEach(v => bst.insert(v));
// bst.remove(5);
// [10, 5, 20, 18].forEach(v => bst.insert(v));
// bst.remove(5);

// bst.printTree();
 