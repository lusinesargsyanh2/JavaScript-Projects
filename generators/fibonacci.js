function* fibonacci() {
    let num = 0;
    let nextNum = 1;

    while (true) {
        yield num;
        [num, nextNum] = [nextNum, num + nextNum];
    }
}

const num = fibonacci();

console.log(num.next().value);
console.log(num.next().value);
console.log(num.next().value);
console.log(num.next().value);
console.log(num.next().value);
console.log(num.next().value);
console.log(num.next().value);
console.log(num.next().value);
