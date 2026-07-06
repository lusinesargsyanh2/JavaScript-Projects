Array.prototype.myForEach = function (cb, thisArg) {
    thisArg ??= globalThis;
    const size = this.length;


    if (typeof cb !== "function") {
        throw new TypeError(`${cb} is not a function`);
    }


    for (let i = 0; i < size; i++) {
        if (i in this) {
            cb.call(thisArg, this[i], i, this)
        }
    }
}

const arraySparse = [1, 3, , 7];
let numCallbackRuns = 0;

arraySparse.forEach((element) => {
    console.log({ element });
    numCallbackRuns++;
});


console.log({ numCallbackRuns });

// { element: 1 }
// { element: 3 }
// { element: 7 }
// { numCallbackRuns: 3 }


const numbers = [1, 2, 3];

const context = {
    multiplier: 10
};

numbers.myForEach(function (num) {
    console.log(num * this.multiplier);
}, context);