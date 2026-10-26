class PriorityQueue {
    constructor(compareFn) {
        this.heap = [];
        this.compareFn = compareFn || ((a, b) => a - b);
    }

    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }

    heapifyUp() {
        let index = this.heap.length - 1;
        while (this.compareFn(this.heap[index], this.getParentValue(index)) < 0) {
            this.swap(index, this.getParent(index));

            index = this.getParent(index);
        }
    }

    heapifyDown(index = 0) {

        let smallest = index;
        while (true) {
            let left = this.getLeftChild(index);
            let right = this.getRightChild(index);

            if (this.compareFn(this.getLeftChildValue(index), this.heap[smallest]) < 0) {
                smallest = left
            }

            if (this.compareFn(this.getRightChildValue(index), this.heap[smallest]) < 0) {
                smallest = right
            }

            if (smallest === index) return;

            this.swap(index, smallest);
            index = smallest;
        }
    }

    getParent(i) {
        return Math.floor((i - 1) / 2)
    }

    getParentValue(i) {
        return this.heap[this.getParent(i)];
    }

    getLeftChild(i) {
        return (i * 2) + 1;
    }

    getLeftChildValue(i) {
        return this.heap[this.getLeftChild(i)];
    }

    getRightChild(i) {
        return (i * 2) + 2;
    }

    getRightChildValue(i) {
        return this.heap[this.getRightChild(i)];
    }

    size() {
        return this.heap.length;
    }

    isEmpty() {
        return this.heap.length === 0;
    }

    peek() {
        if (this.isEmpty()) return;
        return this.heap[0];
    }

    push(value) {
        this.heap.push(value);
        this.heapifyUp();
    }

    pop() {
        if (this.isEmpty()) return;

        const root = this.heap[0];
        const last = this.heap.pop();

        if (!this.isEmpty()) {
            this.heap[0] = last;
            this.heapifyDown(0);
        }
        return root;
    }
}

// const pq = new PriorityQueue((a,b)=>b-a);
const pq = new PriorityQueue();

pq.push(10);
pq.push(20);
pq.push(30);
pq.push(5);
pq.push(40);

console.log(pq.heap);
// [5, 10, 30, 20, 40]

console.log(pq.pop()); // 5
console.log(pq.heap);  // [10, 20, 30, 40]

console.log(pq.pop()); // 10
console.log(pq.heap);  // [20, 40, 30]
console.log("peek ", pq.peek());
console.log("size ", pq.size());


console.log(pq.pop()); // 20
console.log(pq.heap);  // [30, 40]