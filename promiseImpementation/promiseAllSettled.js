function promiseAllSettled(promises) {
    return new Promise((resolve, reject) => {
        if (!promises.length) {
            return resolve([]);
        }
        let completed = 0;
        const result = new Array(promises.length);

        for (let i = 0; i < promises.length; i++) {
            Promise.resolve(promises[i]).then(value => {
                result[i] = {
                    status: "fulfilled",
                    value
                }
            }).catch(reason => {
                result[i] = {
                    status: "rejected",
                    reason
                }
            }).finally(() => {
                completed++;
                if (completed === promises.length) {
                    resolve(result);
                }
            })
        }
    })


}


const promise1 = Promise.resolve(3);
const promise2 = new Promise((resolve, reject) =>
    setTimeout(() => reject("foo"), 100),
);
const promise3 = 10;
const promises = [promise1, promise2, promise3];

promiseAllSettled(promises).then((results) => {
    results.forEach((result) => console.log(result.status))
    console.log(results);
}
);

