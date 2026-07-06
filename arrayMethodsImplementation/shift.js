Array.prototype.myShift = function () {
    if (this.length === 0) return undefined;

    const removedItem = this[0];

    for (let i = 0; i < this.length - 1; i++) {
        this[i] = this[i + 1];
    }
    this.length--;

    return removedItem;

}

const names = ["Andrew", "Paul", "Maria"];
const emptyArr = [];


const shifted = names.myShift();
const shiftedEmpty = emptyArr.myShift();

console.log(names);

console.log(shifted);

console.log(shiftedEmpty);
