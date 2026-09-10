function* storeGenerator(initialValue) {
    let val = initialValue;

    while (true) {
        let newVal = yield val * 2;

        if (newVal !== undefined) {
            val = newVal; // change current value, if it is undefined value stay same
        }
    }

}

const store = storeGenerator(40);

console.log(store.next().value);
console.log(store.next(10).value);
console.log(store.next(6).value);

