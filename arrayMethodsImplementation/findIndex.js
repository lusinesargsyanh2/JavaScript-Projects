Array.prototype.myFindIndex = function (cb, thisArg) {
    thisArg ??= globalThis;
    size = this.length;

    if (typeof cb !== "function") {
        throw new TypeError(`${cb} is not a function`);
    }


    for (let i = 0; i < size; i++) {
        if (i in this && cb.call(thisArg, this[i], i, this)) {
            return i;
        }
    }

    return -1;

}


const array = [5, 12, 8, 130, 44];

const isLargeNumber = (element) => element > 13;

console.log(array.myFindIndex(isLargeNumber));
// Expected output: 3