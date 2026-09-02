function CustomPromiseAll(promises) {
    return new Promise((resolve, reject) => {

        if (!promises.length) {
            return resolve([]);
        }
        let count = 0;
        const result = new Array(promises.length);

        for (let i = 0; i < promises.length; i++) {
            Promise.resolve(promises[i]).then((val) => {
                result[i] = val;
                count++;
                if (count === promises.length) {
                    resolve(result);
                }
            }).catch(reject);
        }

    })
}

const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
    setTimeout(resolve, 100, "foo");
});


CustomPromiseAll([]).then((values) => {
    console.log(values);
});
CustomPromiseAll([promise1, promise2, promise3])
    .then((values) => {
        console.log(values);
    });