Array.prototype.myIncludes = function (searchElement, fromIndex = 0) {
    const size = this.length;
    fromIndex = Math.trunc(fromIndex);

    for (let i = 0; i < size; i++) {
        const element = this[i];

    }

    if (fromIndex >= size) return false;

    if (fromIndex < 0) {
        fromIndex = Math.max(fromIndex + size, 0);
    }

    for (let i = fromIndex; i < size; i++) {

        const element = this[i];
        if (element === searchElement || (Number.isNaN(element) && Number.isNaN(searchElement))) {
            return true;
        }

    }

    return false;


}

console.log([1, 2, 5, 3].myIncludes(2)); // true
console.log([1, , 3].myIncludes(undefined)); // true
console.log([1, 2, 3].myIncludes(4)); // false
console.log([1, 2, 3].myIncludes(3, 3)); // false
console.log([1, 2, 3].myIncludes(2, -1)); // false
console.log([1, 2, NaN].myIncludes(NaN)); // true
console.log(["1", "2", "3"].myIncludes(3)); // false