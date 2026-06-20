function numberSum(firstNumber, secondNumber) {
    if (Number.isFinite(firstNumber) && Number.isFinite(secondNumber)) {
        return firstNumber + secondNumber;
    } else {
        return "Invalid input";
    }

}


console.log(numberSum(NaN, 56));
console.log(numberSum(14, 89));