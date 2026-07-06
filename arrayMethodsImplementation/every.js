Array.prototype.myEvery = function (cb, thisArg) {
    thisArg ??= globalThis;
    const size = this.length;

    if (typeof cb !== "function") {
        throw new TypeError(`${cb} is not a function`);
    }

    for (let i = 0; i < size; i++) {
        if (i in this && !cb.call(thisArg, this[i], i, this)) {
            return false;
        }

    }

    return true;
}

const isBelowThreshold = (currentValue) => currentValue < 40;

const array1 = [1, 20, 39, 29, 10, 13];

console.log(array1.myEvery(isBelowThreshold));
