function sumNumbers(num) {
    let sum = num;

    function next(secondNum) {
        if (secondNum === undefined) {
            return sum;
        }

        sum += secondNum;
        return next;
    }

    return next;
}

console.log(sumNumbers(2)(3)(4)());