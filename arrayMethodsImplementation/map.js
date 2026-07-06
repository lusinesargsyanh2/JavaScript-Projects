Array.prototype.myMap = function (cb, thisArg) {
    thisArg ??= globalThis;

    const res = [];
    const size = this.length;

    if (typeof cb !== "function") {
        throw new TypeError(`${cb} is not a function`);
    }

    for (let i = 0; i < size; ++i) {
        if (i in this) {
            res.push(cb.call(thisArg, this[i], i, this));
        } else {
            ++res.length;
        }
    }

    return res;
};

const nums = [1, , , , , , , , , 2, 3, 4, 5];
const ob = {
    num: 10,
};

const mapped = nums.myMap(function (elem) {
    return elem + this.num;
}, ob);

console.log(mapped); 
