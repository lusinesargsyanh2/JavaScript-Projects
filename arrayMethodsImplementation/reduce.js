Array.prototype.myReduce = function (cb, initialValue) {
    let accumulator = initialValue;
    let startIndex = 0;

    if (typeof cb !== "function") {
        throw new TypeError(`${cb} is not a function`);
    }

    if (this.length === 0 && arguments.length < 2) {
        throw new TypeError("Reduce of empty array with no initial value");
    }

    if (arguments.length < 2) { // if no initialValue
        accumulator = this[0];
        startIndex = 1;
    }


    for (let i = startIndex; i < this.length; i++) {
        accumulator = cb(accumulator, this[i], i, this);
    }

    return accumulator;
};

const fruits = ["apple", "banana", "apple"];

const counts = fruits.myReduce((acc, fruit) => {
    acc[fruit] = (acc[fruit] || 0) + 1;
    return acc;
}, {});

console.log(counts);

console.log([1, 2, 3].myReduce((acc, cur) => acc + cur));


const getMax = (acc, num) => Math.max(acc, num);
console.log([1, 100].myReduce(getMax, 50));

// [].myReduce(getMax); // TypeError