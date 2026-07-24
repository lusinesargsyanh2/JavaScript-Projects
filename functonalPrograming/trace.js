function trace(cb) {
    function traced(...args) {
        const result = cb(...args);

        traced.history.push({
            args,
            output: result
        });

        return result;
    };

    traced.history = [];

    return traced;
}

function foo(a, b) {
    return a + b;
}

const tracedFunc = trace(foo);
console.log(tracedFunc(1, 2)); //3
console.log(tracedFunc(2, 4)); //6

console.log(tracedFunc.history); //[{args:[1,2], output: 3}, {args:[2,4], output:6}}]