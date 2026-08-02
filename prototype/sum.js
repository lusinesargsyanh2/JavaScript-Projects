Array.prototype.mySum = function () {
    const array = this;
    let sum = 0;

    if (array.length === 0) return 0;

    for (let i = 0; i < array.length; i++) {
        if (typeof array[i] !== "number" || isNaN(array[i])) throw new Error("Array must contain only numbers");

        sum += array[i];


    }
    return sum;

}

console.log([1, 2, 3].mySum()); // 6
console.log([10, -5, 4].mySum()); // 9
console.log([].mySum()); // 0

console.log([1, "2", 3].mySum()); // Error
console.log([1, NaN].mySum()); // Error
console.log([true, 2].mySum()); // Error

