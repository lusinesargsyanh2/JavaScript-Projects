Array.prototype.myUnshift = function (...args) {
    const count = args.length;

    // move items to right
    for (let i = this.length - 1; i >= 0; i--) {
        this[i + count] = this[i];
    }

    // add items from beginning
    for (let i = 0; i < count; i++) {
        this[i] = args[i];
    }

    return this.length
}

let arr = [4, 5, 6];

arr.myUnshift(1, 2, 3);
console.log(arr);
// [1, 2, 3, 4, 5, 6]

arr = [4, 5, 6]; // resetting the array

arr.myUnshift(1);
arr.myUnshift(2);
console.log(arr.myUnshift(3));  // 6

console.log(arr);
// [3, 2, 1, 4, 5, 6]