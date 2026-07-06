function getRemainder(dividend, divisor) {
    const quotient = Math.trunc(dividend / divisor);
    return dividend - (divisor * quotient);
}

console.log(getRemainder(5, 3));   // 2
console.log(getRemainder(-1, 3));  // -1 
console.log(getRemainder(6, 2));  // 0

