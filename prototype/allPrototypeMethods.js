function getPrototypeMethods(obj) {
    const prototype = Object.getPrototypeOf(obj);

    if (prototype === null || prototype === Object.prototype) {
        return [];
    }

    return Object.getOwnPropertyNames(prototype).filter((item) => typeof (prototype[item]) === 'function');
}

function User(name) {
    this.name = name;
}

User.prototype.sayHi = function () {
    return `Hi, ${this.name}`;
};

User.prototype.getName = function () {
    return this.name;
};


const user = new User("Alex");

console.log(getPrototypeMethods(user)); // ["constructor", "sayHi", "getName"] order may vary 
console.log(getPrototypeMethods({ a: 1 })); // []
console.log(getPrototypeMethods([]).includes("push")); // true

const base = {
    x: 10,
    print() {
        return "hello";
    }
};

const obj = Object.create(base);

console.log(getPrototypeMethods(obj)); // ["print"]
console.log(getPrototypeMethods(Object.create(null))); // []