class Animal {
    #name;
    #age;
    #energy;

    constructor(name, age, energy = 100) {
        this.#age = age;
        this.#name = name;
        this.#energy = energy;
    }

    get name() {
        return this.#name;
    }
    set name(value) {
        this.#name = value;
    }
    get age() {
        return this.#age;
    }
    set age(value) {
        this.#age = value;
    }
    get energy() {
        return this.#energy;
    }
    set energy(value) {
        this.#energy = Math.max(0, Math.min(100, value));
    }

    eat() {
        this.energy += 20;
    }
    sleep(hours) {
        this.energy += hours * 10;
    }
    getInfo() {
        return `${this.name} is ${this.age} year old have energy is ${this.energy}`;
    }

}

class Predator extends Animal {
    #isHungry;
    constructor(name, age, isHungry = true) {
        super(name, age);
        this.#isHungry = isHungry;
    }

    get isHungry() {
        return this.#isHungry;
    }
    set isHungry(value) {
        this.#isHungry = value;
    }

    hunt() {
        this.energy -= 30;
    }
    getInfo() {
        return `${super.getInfo()} and  ${this.isHungry ? "is" : "isn't"} hungry`;
    }
}

class Lion extends Predator {
    #prideName
    constructor(name, age, prideName) {
        super(name, age);
        this.#prideName = prideName;
    }

    get prideName() {
        return this.#prideName;
    }
    set prideName(value) {
        this.#prideName = value;
    }
    roar() {
        this.energy -= 10;
    }
    hunt() {
        super.hunt();
    }
    getInfo() {
        return `${super.getInfo()}, pride name is ${this.prideName}`;
    }

}

class Herbivore extends Animal {
    #favoritePlant;

    constructor(name, age, favoritePlant) {
        super(name, age);
        this.#favoritePlant = favoritePlant;

    }
    get favoritePlant() {
        return this.#favoritePlant;
    }
    set favoritePlant(value) {
        this.#favoritePlant = value;
    }
    graze() {
        this.energy -= 10; // searching for food
        this.energy += 15; // eating restores energy
    }
    getInfo() {
        return `${super.getInfo()} and favorite plant is  ${this.favoritePlant}`;
    }
}

class Rabbit extends Herbivore {
    #jumpHeight;
    constructor(name, age, favoritePlant, jumpHeight) {
        super(name, age, favoritePlant);
        this.#jumpHeight = jumpHeight;
    }

    get jumpHeight() {
        return this.#jumpHeight;
    }
    set jumpHeight(value) {
        this.#jumpHeight = value;
    }
    graze() {
        this.energy -= 5; // searching for food
        this.energy += 20; // eating restores energy
    }
    jump() {
        this.energy -= 5;
    }
    getInfo() {
        return `${super.getInfo()}, jump height is ${this.jumpHeight}`;
    }
}



const lion = new Lion("Simba", 10, "Simba's pride");


console.log(lion.energy); //100
lion.eat(); // not change energy because max energy is 100
console.log(lion.energy); // 100 
lion.hunt();
console.log(lion.energy);
console.log(lion.getInfo());

lion.eat();
console.log(lion.energy);
lion.isHungry = false;

console.log(lion.getInfo());


const rabbit = new Rabbit("Judy Hopps", 24, "carrot", 40);
console.log("Rabbit example");

console.log(rabbit.getInfo());
console.log(rabbit.energy);
rabbit.jump()
rabbit.jump()
rabbit.jump()
rabbit.jump()
console.log(rabbit.energy);
rabbit.graze()
console.log(rabbit.energy);




