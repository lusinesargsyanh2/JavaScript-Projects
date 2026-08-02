function checkProperty(obj, key) {

    if (Object.prototype.hasOwnProperty.call(obj, key)) {
        return "own";
    }

    let prototype = Object.getPrototypeOf(obj);

    while (prototype !== null) {
        if (Object.prototype.hasOwnProperty.call(prototype, key)) {
            return "inherited";
        }
        prototype = Object.getPrototypeOf(prototype); // move to next prototype
    }

    return "not found";
}
const animal = { eats: true };
const dog = Object.create(animal);
dog.name = "Rex";


console.log(checkProperty(dog, "name")); // own
console.log(checkProperty(dog, "eats")); // inherited
console.log(checkProperty(dog, "age")); // not found

const obj = Object.create(null);
obj.value = 10;

console.log(checkProperty(obj, "value")); // own
console.log(checkProperty(obj, "toString")); // not found
console.log(checkProperty({}, "toString")); // inherited   