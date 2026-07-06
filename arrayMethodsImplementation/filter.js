
Array.prototype.myFilter = function (cb, thisArg) {
    thisArg ??= globalThis;

    const result = [];
    let index = 0;
    const size = this.length;

    if (typeof cb !== "function") {
        throw new TypeError(`${cb} is not a function`);
    }

    for (let i = 0; i < size; i++) {
        if (i in this && cb.call(thisArg, this[i], i, this)) {
            result.push(this[i])
        }
    }

    return result;
}

// examples

const words = ["spray", "elite", "exuberant", "destruction", "present"];

const result = words.myFilter((word) => word.length > 6);

console.log(result);

console.log([1, , undefined].myFilter((x) => x === undefined)); // [undefined]
console.log([1, , undefined].myFilter((x) => x !== 2)); // [1, undefined]


const person = {
    minAge: 18
};

const ages = [15, 20, 25];

const result2 = ages.myFilter(function (age) {
    return age >= this.minAge;
}, person);

console.log(result2); // [20, 25]