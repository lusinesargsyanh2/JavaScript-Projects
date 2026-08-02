class Employee {
    #name;
    #baseSalary;
    constructor(name, baseSalary) {
        this.#name = name;
        this.#baseSalary = baseSalary;
    }

    getName() {
        return this.#name;
    };
    getBaseSalary() {
        return this.#baseSalary;
    };
    calculatePay() {
        return this.#baseSalary;
    };
    getProfileInfo() {
        return `${this.#name} base compensation is: ${this.#baseSalary}`;
    }

}


class Developer extends Employee {
    #mainLanguage;
    #bugsFixed;
    constructor(name, baseSalary, mainLanguage, bugsFixed) {
        super(name, baseSalary);
        this.#bugsFixed = bugsFixed;
        this.#mainLanguage = mainLanguage;
    }
    writeCode() {
        return `${this.getName()} is writing code in ${this.#mainLanguage}`;
    }
    fixBug() {
        this.#bugsFixed++;
        return `${this.getName()} fixed ${this.#bugsFixed} bugs`;
    }

}

class Manager extends Employee {
    #teamSize;
    #successfulDeals;
    constructor(name, baseSalary, successfulDeals, teamSize) {
        super(name, baseSalary);
        this.#successfulDeals = successfulDeals;
        this.#teamSize = teamSize;
    }

    conductMeeting() {
        return `${this.getName()} conducting meeting with team of ${this.#teamSize} employees`
    }
    closeDeal() {
        this.#successfulDeals++;
        return `${this.getName()}  has ${this.#successfulDeals} deals`;
    }

}


const dev = new Developer("Sam", 400000, 'JS', 5);

console.log(dev.writeCode());
console.log(dev.fixBug());
console.log(dev.fixBug());

const manager = new Manager('Merry', 300000, 2, 20);

console.log(manager.conductMeeting());
console.log(manager.closeDeal());

