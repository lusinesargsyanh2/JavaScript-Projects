const errorMessage = {
    missingElem: "Please add element",
    validIndex: "Please enter valid index",
    eraseEmpty: "Cannot erase element from empty list",
    empty: "Empty list",
    emptyValue: "Please enter valid value",
    validList: "Please enter valid list",
    expectArr: "Expected an array"
}
class Node {
    constructor(data, next = null) {
        this.val = data;
        this.next = next;
    }
}

class SList {
    #size = 0;
    constructor(iterables) {
        this.head = null;

        if (iterables === undefined) {
            return;
        }
        if (iterables && typeof iterables[Symbol.iterator] === "function") {
            for (const item of iterables) {
                this.push_back(item)
            }
        } else {
            this.push_back(iterables);
        }

    }

    static fromArray(arr) {
        if (!Array.isArray(arr)) {
            throw new TypeError(errorMessage.expectArr);
        }
        const list = new SList();

        for (const elem of arr) {
            list.push_back(elem);
        }

        return list;
    }

    get size() {
        return this.#size;
    }

    clear() {
        if (!this.isEmpty()) {
            this.head = null;
            this.#size = 0;
        }
    }

    push_back(elem) {
        if (elem === undefined) {
            throw new Error(errorMessage.missingElem);
        }

        const newNode = new Node(elem);
        if (!this.isEmpty()) {
            let curr = this.head;

            while (curr.next) {
                curr = curr.next;
            }
            curr.next = newNode;

        } else {
            this.head = newNode;

        }
        this.#size++;

    }

    push_front(elem) {
        if (elem === undefined) {
            throw new Error(errorMessage.missingElem);
        }
        const newNode = new Node(elem);

        if (!this.isEmpty()) {
            newNode.next = this.head;
            this.head = newNode;
        } else {
            this.head = newNode;
        }

        this.#size++;
    }

    pop_back() {
        if (this.isEmpty()) {
            return;
        }

        if (!this.head.next) {
            this.head = null;
            this.#size--;
            return;
        }

        let curr = this.head;

        while (curr.next.next) {
            curr = curr.next;
        }
        curr.next = null;
        this.#size--;
    }

    pop_front() {
        if (this.isEmpty()) {
            return;
        }
        let curr = this.head;

        this.head = curr.next;
        this.#size--;

    }

    toArray() {
        if (this.isEmpty()) return [];
        let size = this.#size;
        let curr = this.head;
        let res = new Array(size);

        let i = 0;

        while (curr) {
            res[i++] = curr.val;
            curr = curr.next;

        }

        return res
    }

    front() {
        return this.isEmpty() ? undefined : this.head.val;
    }

    isEmpty() {
        return this.head ? false : true;
    }

    at(index) {
        if (index < 0 || index >= this.#size) return undefined;

        let curr = this.head;
        let i = 0;

        while (i < index) {
            curr = curr?.next;
            i++;
        }

        return curr.val
    }

    insert(index, value) {
        if (index < 0 || index > this.#size) {
            throw new Error(errorMessage.validIndex);
        }

        const newNode = new Node(value);

        if (index === 0) {
            newNode.next = this.head;
            this.head = newNode;
            this.#size++;
            return;
        }

        let curr = this.head;
        let i = 0;

        while (i < index - 1) {
            curr = curr.next;
            i++;
        }
        newNode.next = curr.next;
        curr.next = newNode;
        this.#size++;

    }

    erase(index) {
        if (this.isEmpty()) {
            throw new Error(errorMessage.eraseEmpty);
        }
        if (index < 0 || index >= this.#size) {
            throw new Error(errorMessage.validIndex);
        }

        if (index === 0) {
            this.head = this.head.next;
            this.#size--;
            return;
        }
        let curr = this.head;
        let i = 0;

        while (i < index - 1) {
            curr = curr.next;
            i++;
        }
        curr.next = curr.next.next;
        this.#size--;
    }

    reverse() {
        let curr = this.head;
        let prev = null;

        while (curr) {
            const next = curr.next
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        this.head = prev;
    }

    merge(list) {
        if (!(list instanceof SList)) {
            throw new Error(errorMessage.validList);
        }

        let curr = list.head;

        while (curr) {
            this.push_back(curr.val);
            curr = curr.next;
        }

        // Sort the merged list
        this.sort();
    }

    remove(value) {
        if (!value) {
            throw new Error(errorMessage.emptyValue);

        }
        if (this.isEmpty()) {
            throw new Error(errorMessage.empty);
        }

        if (this.head.val === value) { // first node
            this.head = this.head.next;
            this.#size--;
            return true;
        }

        let curr = this.head;

        while (curr.next) {
            if (curr.next.val === value) break;

            curr = curr.next
        }
        if (curr.next) {
            curr.next = curr.next.next;
            this.#size--;
            return true;
        }
        return false;// if node is not found

    }

    sort(cmp) {
        cmp = typeof cmp === "function" ? cmp : (a, b) => a - b;

        function mergeSort(list) {
            if (!list || !list.next) return list;

            let slow = list;
            let fast = list;

            while (fast.next && fast.next.next) {
                slow = slow.next;
                fast = fast.next.next;
            }

            const mid = slow.next;
            slow.next = null;

            const left = mergeSort(list);
            const right = mergeSort(mid);

            return merge(left, right);
        }
        function merge(l1, l2) {
            const dummy = new Node(null);
            let curr = dummy;

            while (l1 && l2) {
                if (cmp(l1.val, l2.val) <= 0) {
                    curr.next = l1;
                    l1 = l1.next;
                } else {
                    curr.next = l2;
                    l2 = l2.next;
                }
                curr = curr.next;
            }
            curr.next = l1 || l2;
            return dummy.next;
        }

        this.head = mergeSort(this.head);
    }


    [Symbol.iterator]() {
        let curr = this.head;

        return {
            next() {
                if (curr) {
                    const value = curr.val;
                    curr = curr?.next;

                    return {
                        value,
                        done: false
                    };
                }
                return {
                    value: undefined,
                    done: true
                };

            }
        }
    }
}



const list = new SList([1, 2, 3, 4, 5, 6, 7, 7]);
const list2 = new SList([6, 2, 9, 12, 8, 7]);

list.push_back(19);
list.push_back(18);
list.push_front(11);
list.push_front(15);


// for (const elem of list) {
//     console.log(elem);
// } // iterator 

// console.log("value at 4 index", list.at(4)); // index starts from 0
// console.log(list.toArray());
// list.insert(2, 150);
// console.log("insert",list.toArray());



// console.log("size", list.size);

// list.erase(1)
// console.log("erase arr", list.toArray());
// console.log("size", list.size);
// list.reverse();
// console.log("erase arr", list.toArray());
// console.log(list.remove(7));


// console.log("remove arr", list.toArray());

// list.sort()

// console.log("sort", list.toArray());

list.merge(list2);
console.log("merge", list.toArray());
console.log("list2", list2.toArray());

console.log("size", list.size);
