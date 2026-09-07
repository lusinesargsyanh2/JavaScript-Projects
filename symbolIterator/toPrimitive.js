const product = {
    name: 'Laptop',
    price: 1500,

    [Symbol.toPrimitive](hint) {
        if (hint === "string") {
            return `${this.name}: $${this.price}`;
        }
        if (hint === "number") {
            return this.price;
        }
        if (hint === "default") {
            return this.price;
        }
    }
};

console.log(String(product));
console.log(Number(product));
console.log(product + 100); // work default 1500 + 100