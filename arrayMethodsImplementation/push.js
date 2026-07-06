Array.prototype.myPush = function (...args) {

    for (let item of args) {
        this[this.length] = item
    }

    return this.length;
}

const arr = [3, 7, 4, 9, 6, 12];

const arrLength = arr.myPush(7, 6);
console.log(arr);
console.log(arrLength);

