// Animal
function Animal(name, age, energy = 100) {
    this._name = name;
    this._age = age;
    this._energy = energy;
}
Animal.prototype.getName = function () {
    return this._name;
}
Animal.prototype.setName = function (value) {
    this._name = value;
}
Animal.prototype.getAge = function () {
    return this._age;
}
Animal.prototype.setAge = function (value) {
    this._age = value;
}
Animal.prototype.getEnergy = function () {
    return this._energy;
}
Animal.prototype.setEnergy = function (value) {
    this._energy = Math.max(0, Math.min(100, value));
}
Animal.prototype.eat = function () {
    this.setEnergy(this.getEnergy() + 20);
}
Animal.prototype.sleep = function (hours) {
    this.setEnergy(this.getEnergy() + hours * 10);
}
Animal.prototype.getInfo = function () {
    return `${this._name} is ${this._age} year old have energy is ${this._energy}`;
}
// Animal end 
// Predator
function Predator(name, age, isHungry = true) {
    Animal.call(this, name, age);
    this._isHungry = isHungry;
}

Predator.__proto__ = Animal;
Predator.prototype = Object.create(Animal.prototype); // Predator.prototype.__proto__ --> Animal.prototype
Predator.prototype.constructor = Predator;

Predator.prototype.hunt = function () {
    this.setEnergy(this.getEnergy() - 30);
}
Predator.prototype.getInfo = function () {
    return `${this._name} is ${this._age} year old have energy is ${this._energy}  and  ${this._isHungry ? "is" : "isn't"} hungry`;
}

Predator.prototype.getIsHungry = function () {
    return this._isHungry;
}
Predator.prototype.setIsHungry = function (value) {
    this._isHungry = value
}

// Predator end
// Lion
function Lion(name, age, prideName) {
    Predator.call(this, name, age);
    this._prideName = prideName;
}


Lion.__proto__ = Predator
Lion.prototype = Object.create(Predator.prototype); // Lion.prototype.__proto__ --> Predator.prototype
Lion.prototype.constructor = Lion;

Lion.prototype.getPrideName = function () {
    return this._prideName;
}
Lion.prototype.setPrideName = function (value) {
    this._prideName = value
}
Lion.prototype.roar = function () {
    this.setEnergy(this.getEnergy() - 10);
}
// Lion end
// Herbivore
function Herbivore(name, age, favoritePlant) {
    Animal.call(this, name, age);
    this._favoritePlant = favoritePlant;
}
Herbivore.__proto__ = Animal;
Herbivore.prototype = Object.create(Animal.prototype); // Herbivore.prototype.__proto__ --> Animal.prototype
Herbivore.prototype.constructor = Herbivore;

Herbivore.prototype.getFavoritePlant = function () {
    return this._favoritePlant;
}
Herbivore.prototype.setFavoritePlant = function (value) {
    this._favoritePlant = value
}
Herbivore.prototype.graze = function () {
    this.setEnergy(this.getEnergy() - 10);// searching for food
    this.setEnergy(this.getEnergy() + 15);// eating restores energy
}
Herbivore.prototype.getInfo = function () {
    return `${this._name} is ${this._age} year old have energy is ${this._energy} and favorite plant is  ${this._favoritePlant}`;
}
// Herbivore end
// Rabbit
function Rabbit(name, age, favoritePlant, jumpHeight) {
    Herbivore.call(this, name, age, favoritePlant);
    this._jumpHeight = jumpHeight;
}

Rabbit.__proto__ = Herbivore
Rabbit.prototype = Object.create(Herbivore.prototype); // Rabbit.prototype.__proto__ --> Herbivore.prototype
Rabbit.prototype.constructor = Rabbit;

Rabbit.prototype.getJumpHeight = function () {
    return this._jumpHeight;
}
Rabbit.prototype.setJumpHeight = function (value) {
    this._jumpHeight = value
}
Rabbit.prototype.graze = function () {
    this.setEnergy(this.getEnergy() - 5);// searching for food
    this.setEnergy(this.getEnergy() + 20);// eating restores energy
}

Rabbit.prototype.jump = function () {
    this.setEnergy(this.getEnergy() - 5);
}

// Rabbit end



const lion = new Lion("Simba", 10, "Simba's pride");


console.log(lion.getEnergy()); //100
lion.eat(); // not change energy because max energy is 100
console.log(lion.getEnergy()); // 100 
lion.hunt();
console.log(lion.getEnergy());
console.log(lion.getInfo());

lion.eat()
console.log(lion.getEnergy());
lion.setIsHungry(false)
console.log(lion.getInfo());

const rabbit = new Rabbit("Judy Hopps", 24, "carrot", 40);

console.log("Rabbit example");
console.log(rabbit.getInfo());
console.log(rabbit.getEnergy());
rabbit.jump()
rabbit.jump()
rabbit.jump()
rabbit.jump()
console.log(rabbit.getEnergy());
rabbit.graze()
console.log(rabbit.getEnergy());