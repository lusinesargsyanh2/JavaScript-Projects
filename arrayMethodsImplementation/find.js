Array.prototype.myFind = function (cb, thisArg) {
    thisArg ??= globalThis;

    const size = this.length;

    if (typeof cb !== "function") {
        throw new TypeError(`${cb} is not a function`);
    }

    for (let i = 0; i < size; i++) {

        if (cb.call(thisArg, this[i], i, this)) {
            return this[i];
        }

    }
}

const inventory = [
    { name: "apples", quantity: 2 },
    { name: "bananas", quantity: 0 },
    { name: "cherries", quantity: 5 },
];

function isCherries(fruit) {
    return fruit.name === "cherries";
}

console.log(inventory.myFind(isCherries));
// { name: 'cherries', quantity: 5 }

const array = [5, 12, 8, 130, 44];

const found = array.myFind((element) => element > 10);

console.log(found);
// Expected output: 12

