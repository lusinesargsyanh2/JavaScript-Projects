const errorMessage = {
    cap: "Please write valid capacity",
    elem: "Please write valid number",
    empty: "Array is empty",
    index: "Please write valid index",
    valIndex: "Please write valid index and value",
    posVal: "Please write valid position and value",
    validIJ: "Please write valid indexes",
    isNotFunction: "is not a function",
}
class DynamicArray {
    #arr;
    #size;
    #capacity;
    #GROWTH = 2;

    constructor(cap) {
        if (cap <= 0 || !Number.isInteger(cap)) {
            throw new Error(errorMessage.cap);
        }

        this.#arr = new Uint32Array(cap);
        this.#capacity = cap;
        this.#size = 0;
    }

    get arr() {
        return this.#arr;
    }

    #resize() {
        const newCap = this.#capacity * this.#GROWTH;
        const tmp = new Uint32Array(newCap);

        for (let i = 0; i < this.#size; ++i) {
            tmp[i] = this.#arr[i];
        }

        this.#capacity = newCap;
        this.#arr = tmp;
    }

    push_back(elem) {
        if (this.#size === this.#capacity) {
            this.#resize();
        }

        if (!Number.isInteger(elem)) {
            throw new Error(errorMessage.elem);
        }

        this.#arr[this.#size++] = elem;
    }

    pop_back() {
        if (!this.#size) {
            throw new Error(errorMessage.empty);
        }

        return this.#arr[--this.#size];
    }

    at(index) {
        if (!Number.isInteger(index) || index < 0 || index >= this.#size) {
            throw new Error(errorMessage.index);
        }

        return this.#arr[index];
    }

    set(index, value) {
        if (
            !Number.isInteger(index) ||
            index < 0 ||
            index >= this.#size ||
            !Number.isInteger(value)
        ) {
            throw new Error(errorMessage.valIndex);
        }

        this.#arr[index] = value;

        return value;
    }

    front() {
        if (!this.#size) {
            throw new Error(errorMessage.empty);
        }

        return this.#arr[0];
    }

    back() {
        if (!this.#size) {
            throw new Error(errorMessage.empty);
        }

        return this.#arr[this.#size - 1];
    }

    erase(pos) {
        if (!Number.isInteger(pos) || pos < 0 || pos >= this.#size) {
            throw new Error(errorMessage.posVal);
        }
        const remove = this.#arr[pos];
        for (let i = pos; i < this.#size; i++) {
            this.#arr[i] = this.#arr[i + 1];
        }
        this.#size--;
        return remove;
    }

    insert(pos, value) {
        if (!Number.isInteger(pos) || pos < 0 || pos >= this.#size) {
            throw new Error(errorMessage.posVal);
        }

        if (this.#size === this.#capacity) {
            this.#resize();
        }

        for (let i = this.#size; i > pos; --i) {
            this.#arr[i] = this.#arr[i - 1];
        }

        this.#arr[pos] = value;
        this.#size++;

        return pos;
    }

    swap(i, j) {
        if (!Number.isInteger(i) || !Number.isInteger(j) || i < 0 || j < 0 || j >= this.#size || i >= this.#size) {
            throw new Error(errorMessage.validIJ);
        }
        [this.#arr[i], this.#arr[j]] = [this.#arr[j], this.#arr[i]];

    }

    *values() {
        if (!this.#size) {
            throw new Error(errorMessage.empty);
        }
        for (let i = 0; i < this.#size; i++) {
            yield this.#arr[i];
        }
    }

    *keys() {
        if (!this.#size) {
            throw new Error(errorMessage.empty);
        }
        for (let i = 0; i < this.#size; i++) {
            yield i;
        }
    }

    forEach(fn) {
        if (typeof fn !== "function") {
            throw new Error(`${fn} ${errorMessage.isNotFunction}`);
        }

        for (let i = 0; i < this.#size; i++) {
            if (i in this.#arr) {
                fn.call(this.#arr, this.#arr[i], i, this.#arr);
            }
        }
    }

    map(fn) {
        if (typeof fn !== "function") {
            throw new Error(`${fn} ${errorMessage.isNotFunction}`);
        }
        const res = [];
        for (let i = 0; i < this.#size; i++) {
            if (i in this.#arr) {
                res.push(fn.call(this.#arr, this.#arr[i], i, this.#arr));
            } else {
                ++res.length;
            }
        }
        return res;
    }

    filter(fn) {
        if (typeof fn !== "function") {
            throw new Error(`${fn} ${errorMessage.isNotFunction}`);
        }
        const res = [];
        for (let i = 0; i < this.#size; i++) {
            if (i in this.#arr && fn.call(this.#arr, this.#arr[i], i, this.#arr)) {
                res.push(this.#arr[i])
            }
        }
        return res;
    }

    reduce(fn, init) {
        if (!this.#size) {
            throw new Error(errorMessage.empty);
        }
        if (typeof fn !== "function") {
            throw new Error(`${fn} ${errorMessage.isNotFunction}`);
        }

        let accumulator = init ?? this.#arr[0];
        const startIndex = init ? 0 : 1

        for (let i = startIndex; i < this.#size; i++) {
            accumulator = fn(accumulator, this.#arr[i], i, this.#arr)
        }
        return accumulator;
    }

    some(fn) {
        if (typeof fn !== "function") {
            throw new Error(`${fn} ${errorMessage.isNotFunction}`);
        }

        for (let i = 0; i < this.#size; i++) {
            if (i in this.#arr && fn.call(this.#arr, this.#arr[i], i, this.#arr)) {
                return true;
            }
        }
        return false;
    }

    find(fn) {
        if (typeof fn !== "function") {
            throw new Error(`${fn} ${errorMessage.isNotFunction}`);
        }
        for (let i = 0; i < this.#size; i++) {
            if (fn.call(this.#arr, this.#arr[i], i, this.#arr)) {
                return this.#arr[i];
            }
        }
    }

    findIndex(fn) {
        if (typeof fn !== "function") {
            throw new Error(`${fn} ${errorMessage.isNotFunction}`);
        }
        for (let i = 0; i < this.#size; i++) {
            if (fn.call(this.#arr, this.#arr[i], i, this.#arr)) {
                return i;
            }
        }
    }

    includes(value, fromIndex = 0) {
        fromIndex = Math.trunc(fromIndex);
        const size = this.#size

        if (fromIndex >= size) return false;

        if (fromIndex < 0) {
            fromIndex = Math.max(fromIndex + size, 0);
        }

        for (let i = fromIndex; i < size; i++) {
            const element = this.#arr[i];
            if (element === value ||
                (Number.isNaN(element) && Number.isNaN(searchElement))
            ) {
                return true;
            }
        }

        return false;
    }

    [Symbol.iterator]() {
        let index = 0;
        const items = this.#size;
        const arr = this.#arr;

        return {
            next() {
                if (index < items) {
                    return {
                        value: arr[index++],
                        done: false
                    }
                }

                return {
                    value: undefined,
                    done: true
                }
            }
        }
    }
}

const arr = new DynamicArray(5);

arr.push_back(10);
arr.push_back(15);
arr.push_back(20);
arr.push_back(30);
arr.push_back(40);
arr.push_back(50);

console.log(arr.arr);

// arr.forEach((val) => console.log(val * 2))


// console.log(arr.map((val) => val * 3));

// console.log(arr.filter((val) => val >= 20));


// console.log(arr.reduce(
//     (accumulator, curr) => accumulator + curr, 3
// ));

// console.log(arr.reduce(
//     (accumulator, curr) => accumulator + curr,
// ));



// console.log(arr.some((element) => element > 30));

// console.log(arr.find((element) => element > 20));
// console.log(arr.findIndex((element) => element > 30));

// console.log(arr.includes(30, -1));
// console.log(arr.includes(30));
// console.log(arr.includes(NaN));
// console.log(arr.includes(undefined));

// // Symbol.iterator 1
// for (const value of arr) {
//     console.log(value);
// }
// // Symbol.iterator 2
// const iterator = arr[Symbol.iterator]();

// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());

// // Symbol.iterator 3
// console.log([...arr]);
// // Symbol.iterator 4
// const [a, b, c] = arr;

// console.log(a); // 10
// console.log(b); // 15
// console.log(c); // 20