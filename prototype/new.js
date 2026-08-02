function myNew(Constructor, ...args) {

    const obj = {};

    Object.setPrototypeOf(obj, Constructor.prototype);

    const result = Constructor.call(obj, ...args);

    if (
        result !== null &&
        (typeof result === "object" || typeof result === "function")
    ) {
        return result;
    }
    return obj;

}
function User(name) {
    this.name = name;
}

function Car(model) {
    this.model = model;
    return { custom: "returned object" };
}


const user = myNew(User, "Alex");

console.log(user.name); // Alex
console.log(Object.getPrototypeOf(user) === User.prototype); // true
console.log(user.constructor === User); // true

const car = myNew(Car, "BMW");
console.log(car.custom); // returned object

function Empty() { }

const obj = myNew(Empty);
console.log(Object.getPrototypeOf(obj) === Empty.prototype); // true

function Test() {
    return 123;
}

const test = myNew(Test);
console.log(Object.getPrototypeOf(test) === Test.prototype); // true

