Array.prototype.myPop = function () {

    if (this.length === 0) return undefined;

    const removedItem = this[this.length - 1];

    this.length--;


    return removedItem;

}

let emptyArr = [];
let array = ['apple', 'banana', 'orange', 'pear'];

let length1 = emptyArr.myPop();
let length2 = array.myPop();

console.log(length1);
console.log(length2);

console.log(emptyArr);
console.log(array); 
