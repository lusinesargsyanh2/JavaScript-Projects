Array.prototype.mySlice = function (start = 0, end = this.length) {
    const result = [];
    const length = this.length;

    start = start < 0 ? length + start : start;
    end = end < 0 ? length + end : end;

    for (let i = start; i < end; i++) {
        result.push(this[i]);
    }

    return result;
};

const arr = [1, 2, 3, 4, 5];

console.log(arr.mySlice(-2));

console.log(arr.mySlice(1, -1));
