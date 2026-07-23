Array.prototype.mySplice = function (start, deleteCount, ...items) {
    const array = this;
    const length = array.length;


    if (start < 0) {
        start = Math.max(length + start, 0);
    } else {
        start = Math.min(start, length);
    }

    if (deleteCount === undefined) {
        deleteCount = length - start;
    }

    deleteCount = Math.min(
        Math.max(deleteCount, 0),
        length - start
    );


    const removed = [];

    for (let i = 0; i < deleteCount; i++) {
        removed.push(array[start + i]);
    }


    const itemsCount = items.length;
    const diff = itemsCount - deleteCount;


    if (diff < 0) {
        for (let i = start + deleteCount; i < length; i++) {
            array[i + diff] = array[i];
        }

        array.length = length + diff;
    }
    else if (diff > 0) {
        for (let i = length - 1; i >= start + deleteCount; i--) {
            array[i + diff] = array[i];
        }
    }


    for (let i = 0; i < itemsCount; i++) {
        array[start + i] = items[i];
    }


    return removed;
};


const myFish = ["angel", "clown", "mandarin", "sturgeon"];
const removed = myFish.mySplice(2, 0, "drum", "guitar");

console.log(myFish);
console.log(removed);

