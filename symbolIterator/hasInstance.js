const User = {
    [Symbol.hasInstance](value) {
        return (
            value !== null &&
            typeof value === 'object' &&
            'name' in value &&
            'email' in value
        )
    }
};

const user = {
    name: 'John',
    email: 'john@gmail.com'
};

const product = {
    title: 'iPhone',
    price: 1000
};


console.log(user instanceof User);
console.log(product instanceof User);
