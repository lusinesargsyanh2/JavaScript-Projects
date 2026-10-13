const errorMessage = {
    emptyVal: "Please enter element",
    noSpace: "Cannot add element: Stack is full",
    empty: "Stack is empty",
    capInt: "Capacity must be a positive integer"

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
        this.array = new Uint16Array(this.#capacity);
        this.#top = 0;
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

        this.array[this.#top++] = elem;
        this.#size++;

    }

    pop() {
        if (this.isEmpty()) throw new Error(errorMessage.empty);
        const val = this.array[--this.#top];

        this.#size--;
        return val;

    }

    clear() {
        this.#top = 0;
        this.#size = 0;
    }

    [Symbol.iterator]() {
        let index = this.#top - 1;

        return {
            next: () => {
                if (index >= 0) {
                    return {
                        value: this.array[index--],
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


const stack = new Stack(3);

stack.push(10);
stack.push(20);
stack.push(30);

// for (const value of stack) {
//     console.log(value);
// }

console.log(stack.size); // 3

console.log(stack.pop()); // 30
console.log(stack.pop()); // 20

console.log(stack.size); // 1


stack.push(40);

console.log(stack.pop()); // 40
console.log(stack.pop()); // 10

console.log(stack.isEmpty()); // true