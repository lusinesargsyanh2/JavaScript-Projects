const errorMessage = {
    missingElem: "Please add element",
    expectArr: "Expected an array",
    validIndex: "Please enter valid index",
    emptyVal: "Please enter value",
    validList: "Please enter valid list",
    empty: "Empty list",
}

class Node {
    constructor(data, next = null, prev = null) {
        this.val = data;
        this.next = next;
        this.prev = prev;
    }
}

class DList {
    #size = 0;
    constructor(iterables) {
        this.head = null;
        this.tail = null;

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
        const list = new DList();

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
            this.tail = null;
            this.#size = 0;
        }
    }

    push_back(elem) {
        if (elem === undefined) {
            throw new Error(errorMessage.missingElem);
        }
        const newNode = new Node(elem);
        if (this.isEmpty()) {
            this.head = this.tail = newNode;

        } else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;

        }
        this.#size++;
        return;
    }

    push_front(elem) {
        if (elem === undefined) {
            throw new Error(errorMessage.missingElem);
        }
        const newNode = new Node(elem);

        if (this.isEmpty()) {
            this.head = this.tail = newNode;

        } else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }
        this.#size++;
    }

    pop_back() {
        if (this.isEmpty()) {
            return;
        }

        const removed = this.tail;

        if (this.head === this.tail) {
            // only one element
            this.head = this.tail = null;
        } else {
            this.tail = this.tail.prev;
            this.tail.next = null;
            removed.prev = null;
        }

        this.#size--;
        return removed.val;
    }

    pop_front() {
        if (this.isEmpty()) {
            return;
        }

        const removed = this.head;

        if (this.head === this.tail) {
            this.head = this.tail = null;
        } else {
            this.head = this.head.next;
            this.head.prev = null;
            removed.next = null
        }
        this.#size--;
        return removed.val;
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

        return res;
    }

    front() {
        return this.isEmpty() ? undefined : this.head.val;
    }

    back() {
        return this.isEmpty() ? undefined : this.tail.val;
    }

    isEmpty() {
        return !this.head;
    }

    at(index) {
        if (index < 0 || index >= this.#size) return undefined;

        if (index < this.#size / 2) {

            let curr = this.head;
            let i = 0;

            while (i < index) {
                curr = curr.next;
                i++;
            }
            return curr.val;
        } else {

            let curr = this.tail;
            let i = this.#size - 1;
            while (i > index) {
                curr = curr.prev;
                i--;
            }
            return curr.val;
        }

    }

    insert(index, value) {
        if (index < 0 || index > this.#size) {
            throw new Error(errorMessage.validIndex);
        }

        if (value === undefined) {
            throw new Error(errorMessage.emptyVal);

        }

        if (index === 0) {
            this.push_front(value);
            return;
        }
        if (index === this.#size) {
            this.push_back(value);
            return;
        }

        const newNode = new Node(value);
        let curr = this.head;

        if (index < this.#size / 2) {
            let i = 0;

            while (i < index) {
                curr = curr.next;
                i++;
            }

        } else {
            curr = this.tail;
            let i = this.#size - 1;
            while (i > index) {
                curr = curr.prev;
                i--;
            }

        }
        curr.prev.next = newNode;
        newNode.prev = curr.prev;
        newNode.next = curr;
        curr.prev = newNode;

        this.#size++;
    }

    erase(index) {
        if (index < 0 || index >= this.#size) {
            throw new Error(errorMessage.validIndex);
        }

        if (index === 0) {
            return this.pop_front();
        }

        if (index === this.#size - 1) {
            return this.pop_back();
        }

        let curr = this.head;

        if (index < this.#size / 2) {
            let i = 0;

            while (i < index) {
                curr = curr.next;
                i++;
            }

        } else {
            curr = this.tail;
            let i = this.#size - 1;
            while (i > index) {
                curr = curr.prev;
                i--;
            }
        }
        let val = curr.val;
        curr.prev.next = curr.next;
        curr.next.prev = curr.prev;
        this.#size--;

        return val;
    }

    reverse() {
        let curr = this.head;
        while (curr) {
            const next = curr.next;

            [curr.next, curr.prev] = [curr.prev, curr.next]

            curr = next;
        }
        [this.head, this.tail] = [this.tail, this.head]
    }

    merge(list) {
        if (!(list instanceof DList)) {
            throw new Error(errorMessage.validList);
        }

        let tail = this.tail;

        let curr = list.head;

        while (curr) {
            this.push_back(curr.val);
            curr = curr.next;
        }

        // Sort the merged list
        this.sort();
    }

    remove(value) {
        if (value === undefined) {
            throw new Error(errorMessage.emptyVal);
        }
        if (this.isEmpty()) {
            throw new Error(errorMessage.empty);
        }

        let curr = this.head;

        while (curr) {
            if (curr.val === value) {
                if (curr === this.head) {
                    this.pop_front();
                } else if (curr === this.tail) {
                    this.pop_back();
                } else {
                    curr.prev.next = curr.next;
                    curr.next.prev = curr.prev;
                    curr.prev = null;
                    curr.next = null;
                }
            }
            curr = curr.next;

        }

    }

    sort(cmp) {
        cmp = typeof cmp === "function" ? cmp : (a, b) => a - b;
        function mergeSort(list) {
            if (!list || !list.next)
                return list;

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
                    l1.prev = curr === dummy ? null : curr;
                    l1 = l1.next;
                } else {
                    curr.next = l2;
                    l2.prev = curr === dummy ? null : curr;
                    l2 = l2.next;
                }

                curr = curr.next;
            }
            const remaining = l1 || l2;

            if (remaining) {
                curr.next = remaining;
                remaining.prev = curr === dummy ? null : curr;
            } else {
                curr.next = null;
            }

            const head = dummy.next;

            if (head) {
                head.prev = null;
            }

            return head;
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


const dList = new DList([5, 9, 4, 6, 7, 3]);
const dList2 = new DList([6, 2, 9, 12, 8, 7]);

dList.insert(4, 50);

for (const elem of dList) {
    console.log("elem", elem);
}
console.log(dList.size);


dList.merge(dList2)
for (const elem of dList) {
    console.log("elem2", elem);
}
console.log(dList.size);