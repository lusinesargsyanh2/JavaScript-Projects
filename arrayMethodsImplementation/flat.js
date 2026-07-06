Array.prototype.myFlat = function (depth = 1) {
    const array = [];

    if (isNaN(depth) || depth <= 0) {
        return this;
    }


    const spread = (arr, currentDepth) => {
        for (let i = 0; i < arr.length; i++) {
            const value = arr[i];

            if (Array.isArray(value) && currentDepth > 0) {
                spread(value, currentDepth - 1);
            } else {
                array.push(value);
            }
        }
    };

    spread(this, depth);
    return array;
};


const arr1 = [1, 2, [3, [4]]];
console.log(arr1.myFlat());
console.log(arr1.myFlat(2));