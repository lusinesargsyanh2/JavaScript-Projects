function pipe(...funcs) {

    return function (num) {
        let result = num;

        for (const fn of funcs) {
            result = fn(result);
        }

        return result;

    }
}


const add5 = a => a + 5;
const double = a => 2 * a;
const sub4 = a => a - 4;

const func = pipe(add5, add5, double, sub4); // 20
console.log(func(2));