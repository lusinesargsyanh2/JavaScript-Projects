function* numberGenerator(start, end) {
    for (let i = start; i <= end; i++) {
        yield i;
    }
}

const numbers = numberGenerator(5, 9);

console.log(numbers.next().value);
console.log(numbers.next().value);
console.log(numbers.next().value);
console.log(numbers.next().value);
console.log(numbers.next().value);
console.log(numbers.next().value);
