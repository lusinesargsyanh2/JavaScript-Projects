function myInstanceOf(obj, constructor) {
    if (obj === null || (typeof obj !== "object" && typeof obj !== "function")) {
        return false;
    }

    if (typeof constructor !== "function") {
        return false;
    }

    let prototype = Object.getPrototypeOf(obj);
    const targetPrototype = constructor.prototype;

    while (prototype !== null) {
        if (prototype === targetPrototype) {
            return true;
        }
        prototype = Object.getPrototypeOf(prototype); // move to next prototype
    }

    return false;
}
function Animal() { }
function Dog() { }

Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

const num = []

const dog = new Dog();
console.log(myInstanceOf(dog, Dog)); // true
console.log(myInstanceOf(dog, Animal)); // true
console.log(myInstanceOf(dog, Array)); // false

console.log(myInstanceOf(null, Object)); // false
console.log(myInstanceOf(123, Number)); // false
console.log(myInstanceOf("hello", String)); // false