function promiseRace(promises) {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < promises.length; i++) {
            Promise.resolve(promises[i])
                .then(resolve)
                .catch(reject);
        }
    })

}
const promise1 = new Promise((resolve, reject) => {
    setTimeout(() => resolve("one"), 500);
});

const promise2 = new Promise((resolve, reject) => {
    setTimeout(() => resolve("two"), 100);
});

promiseRace([promise1, promise2]).then((value) => {
    console.log(value);
    // Both resolve, but promise2 is faster
});

