const errorMessage = {
    emptyVal: "Please enter element",
    noSpace: "Cannot add element: Stack is full",
    empty: "Stack is empty",
    capInt: "Capacity must be a positive integer"
}

class Node {
    constructor(data, next = null) {
        this.val = data;
        this.next = next;
    }
}

class Stack {
    #capacity;
    #size;
    #top;


    constructor(initialCapacity = 16) {
        if (!Number.isInteger(initialCapacity) || initialCapacity < 1) {
            throw new RangeError(errorMessage.capInt);
        }
        this.#capacity = initialCapacity;
        this.#size = 0;
        this.#top = null;

    }

    isEmpty() {
        return !this.#top;
    }

    get size() {
        return this.#size;
    }

    push(elem) {
        if (!elem) throw new Error(errorMessage.emptyVal);

        if (this.#size === this.#capacity) throw new Error(errorMessage.noSpace);

        this.#top = new Node(elem, this.#top);
        this.#size++;


    }

    pop() {
        if (this.isEmpty()) {
            throw new Error(errorMessage.empty);
        }

        const value = this.#top.val;
        this.#top = this.#top.next;
        this.#size--;

        return value;
    }

    clear() {
        this.#top = null;
        this.#size = 0;
    }

    [Symbol.iterator]() {
        let curr = this.#top;

        return {
            next() {
                if (curr === null) {
                    return { value: undefined, done: true };
                }

                const value = curr.val;
                curr = curr.next;

                return { value, done: false };
            }
        };
    }
}

const stack = new Stack(3);

stack.push(10);
stack.push(20);
stack.push(30);

console.log(stack.size); // 3
// console.log(stack.pop());
// stack.clear()
console.log(stack.isEmpty());

console.log([...stack]); // [30, 20, 10]

// stack.push(40); // Throws: Stack is full