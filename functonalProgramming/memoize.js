function factorial(a) {
    let res = 1;
    for (let i = 2; i <= a; ++i) {
        res *= i;
    }
    return res;
}

function memoize(cb) {
    const cache = {};

    return function (num) {
        if (cache[num]) {
            return cache[num];
        }

        cache[num] = cb(num)

        return cache[num];
    }
}

const foo = memoize(factorial);
console.log(foo(5)); // 120
console.log(foo(5)); // 120 