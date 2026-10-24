const RED = 'RED';
const BLACK = 'BLACK';

class TreeNode {
    constructor(data, color = RED, parent = null, left = null, right = null) {
        this.data = data;
        this.color = color;
        this.parent = parent;
        this.left = left;
        this.right = right;
    }
}

class RBTree {
    constructor() {
        this.nil = new TreeNode(null);
        this.nil.color = BLACK;
        this.root = this.nil;
    }
    rightRotate(y) {
        let x = y.left;
        let T1 = x.right;

        x.parent = y.parent;

        if (y.parent === this.nil) {
            this.root = x;
        } else if (y === y.parent.left) {
            y.parent.left = x;
        } else {
            y.parent.right = x;
        }

        x.right = y;
        y.parent = x;

        y.left = T1;

        if (T1 !== this.nil) {
            T1.parent = y;
        }
    }

    leftRotate(x) {
        let y = x.right;
        let T1 = y.left;

        y.parent = x.parent;

        if (x.parent === this.nil) {
            this.root = y;
        } else if (x === x.parent.left) {
            x.parent.left = y;
        } else {
            x.parent.right = y;
        }

        y.left = x;
        x.parent = y;

        x.right = T1;

        if (T1 !== this.nil) {
            T1.parent = x;
        }
    }

    insertFixUp(newNode) {

        while (newNode.parent.color === RED) {
            let gp = newNode.parent.parent;

            if (newNode.parent === gp.left) { // left side 
                let uncle = gp.right;

                if (uncle.color === RED) {
                    newNode.parent.color = uncle.color = BLACK;
                    gp.color = RED;
                    newNode = gp;

                } else {
                    if (newNode === newNode.parent.right) {
                        newNode = newNode.parent;
                        this.leftRotate(newNode);
                    }
                    newNode.parent.color = BLACK;
                    gp.color = RED;
                    this.rightRotate(gp);
                }

            } else { // right side

                let uncle = gp.left;

                if (uncle.color === RED) {
                    newNode.parent.color = uncle.color = BLACK;
                    gp.color = RED;
                    newNode = gp;
                } else {
                    if (newNode === newNode.parent.left) {
                        newNode = newNode.parent;

                        this.rightRotate(newNode);
                    }
                    newNode.parent.color = BLACK;
                    gp.color = RED;
                    this.leftRotate(gp);
                }

            }
        }
        this.root.color = "BLACK";
    }

    insert(data) {
        let newNode = new TreeNode(data);
        let parent = this.nil;
        let curr = this.root;

        while (curr !== this.nil) {
            parent = curr;

            if (data < curr.data) {
                curr = curr.left;
            } else if (data > curr.data) {
                curr = curr.right;
            } else {
                return;
            }
        }

        if (parent === this.nil) {
            this.root = newNode;
        } else if (newNode.data > parent.data) {
            parent.right = newNode;
        } else {
            parent.left = newNode;
        }

        newNode.parent = parent;
        newNode.left = newNode.right = this.nil;

        this.insertFixUp(newNode);
    }

    printTree(node = this.root, prefix = "", isLeft = true) {
        if (node === this.nil) return;

        if (node.right !== this.nil) {
            this.printTree(
                node.right,
                prefix + (isLeft ? "│   " : "    "),
                false
            );
        }

        console.log(`${prefix}${node.data} [${node.color}]`);

        if (node.left !== this.nil) {
            this.printTree(
                node.left,
                prefix + (isLeft ? "    " : "│   "),
                true
            );
        }
    }

}

const rb = new RBTree();

/////// left
// rb.insert(30);
// rb.insert(20);
// rb.insert(10);
// rb.insert(40);

/////// left
// rb.insert(30);
// rb.insert(20);
// rb.insert(40);
// rb.insert(25);

/////// right
// rb.insert(30);
// rb.insert(20);
// rb.insert(40);
// rb.insert(45);

/////// right
// rb.insert(30);
// rb.insert(20);
// rb.insert(40);
// rb.insert(32);

rb.insert(30);
rb.insert(10);
rb.insert(20);
rb.insert(40);
rb.insert(25);

rb.printTree()
// console.log(rb);