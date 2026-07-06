
Array.prototype.mySome = function (cb, thisArg) {
    thisArg ??= globalThis;

    if (typeof cb !== "function") {
        throw new TypeError(`${cb} is not a function`);
    }
    const size = this.length;

    for (let i = 0; i < size; i++) {
        if (i in this && cb.call(thisArg, this[i], i, this)) {
            return true
        }

    }

    return false;
}

console.log([1, , 3].mySome((x) => x === undefined)); // false
console.log([1, , 1].mySome((x) => x !== 1)); // false
console.log([1, undefined, 1].mySome((x) => x !== 1)); // true