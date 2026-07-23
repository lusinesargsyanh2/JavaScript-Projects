Function.prototype.myBind = function (context, ...args) {
    const fn = this;

    return function (...newArgs) {
        return fn.call(context, ...args, ...newArgs);
    };
};

const module = {
    x: 42,
    getX() {
        return this.x;
    },
};

const newModule = {
    x: 31,
}

const boundGetX = module.getX.myBind(newModule);
console.log(boundGetX());
console.log(module.getX());