const errorMessage = {
    emptyVal: "Please enter element",
    noSpace: "Cannot add element: Queue is full",
    empty: "Queue is empty",
    capInt: "Capacity must be a positive integer"

}

class Queue {
    #capacity;
    #size;
    #front;
    #rear;
    #buffer;

    constructor(capacity = 8) {
        if (!Number.isInteger(capacity) || capacity < 1) {
            throw new RangeError(errorMessage.capInt);
        }

        this.#front = 0;
        this.#capacity = capacity;
        this.#rear = 0;
        this.#size = 0;
        this.#buffer = new Array(capacity);
    }

    enqueue(elem) {
        if (this.#size === this.#capacity) throw new Error(errorMessage.noSpace);

        if (!elem) throw new Error(errorMessage.emptyVal);

        this.#buffer[this.#rear] = elem;
        this.#rear = (this.#rear + 1) % this.#capacity;
        this.#size++;
    }

    dequeue() {
        if (this.isEmpty()) throw new Error(errorMessage.empty);

        const val = this.#buffer[this.#front];
        this.#buffer[this.#front] = undefined;
        this.#front = (this.#front + 1) % this.#capacity;
        this.#size--;

        return val;

    }

    get size() {
        return this.#size;
    }

    get_front() {
        if (this.isEmpty()) throw new Error(errorMessage.empty);

        return this.#buffer[this.#front];
    }

    get_back() {
        if (this.isEmpty()) throw new Error(errorMessage.empty);

        const index =
            (this.#rear - 1 + this.#capacity) % this.#capacity;

        return this.#buffer[index];
    }

    print() {
        const result = [];

        for (let i = 0; i < this.#size; i++) {
            result.push(
                this.#buffer[(this.#front + i) % this.#capacity]
            );
        }

        console.log(result);
    }

    isEmpty() {
        return !this.#size;
    }

    [Symbol.iterator]() {
        let index = 0;
        const size = this.#size;
        const front = this.#front;
        const capacity = this.#capacity;
        const buffer = this.#buffer;

        return {
            next() {
                if (index < size) {
                    const value = buffer[(front + index) % capacity];
                    index++;

                    return { value, done: false };
                }

                return { value: undefined, done: true };
            }
        };
    }
}

const queue = new Queue(3);

queue.enqueue(10);
queue.enqueue(20);
queue.enqueue(30);

// queue.print();                    // [10, 20, 30]
// console.log(queue.get_front());   // 10
// console.log(queue.get_back());    // 30
// console.log(queue.dequeue());     // 10
// queue.print();                    // [20, 30]

// console.log([...queue]);          // [20, 30]
// console.log(queue.size);

module.exports = Queue;