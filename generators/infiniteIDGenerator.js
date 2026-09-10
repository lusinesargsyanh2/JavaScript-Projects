function* idGenerator() {
    let index = 1;
    while (true) {
        yield `id_${index++}`;
    }
}

const id = idGenerator();

console.log(id.next().value);
console.log(id.next().value);
console.log(id.next().value);
console.log(id.next().value);
console.log(id.next().value);
console.log(id.next().value);