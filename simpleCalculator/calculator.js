const sum = (a, b) => a + b;
const minus = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const calculate = (a, b, action) => {
    switch (action) {
        case "+":
            return sum(a, b);

        case "-":
            return minus(a, b);

        case "*":
            return multiply(a, b);

        case "/":
            return divide(a, b);

        default:
            return "Unknown operation";
    }
};


console.log(calculate(10, 5, "+")); // 15
console.log(calculate(10, 5, "-")); // 5
console.log(calculate(10, 5, "*")); // 50
console.log(calculate(10, 5, "/")); // 2