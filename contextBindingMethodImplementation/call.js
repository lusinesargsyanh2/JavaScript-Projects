Function.prototype.myCall = function (thisArg, ...arg) {
    const context = thisArg ?? globalThis;
    const fuSymbol = Symbol("temporaryMethod");

    context.fnSymbol = this;
    const result = context.fnSymbol(...arg);

    delete context.fnSymbol;

    return result;

}


const person = {
    name: "James"
}

function greet(firstText, secondText) {
    console.log(`${firstText} ${this.name}${secondText} `)
}

const message = greet.myCall(person, "Hello", "!")