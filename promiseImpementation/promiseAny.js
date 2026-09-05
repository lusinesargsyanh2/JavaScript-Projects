function promiseAny(promises) {
    return new Promise((resolve, reject) => {
        if (promises.length === 0) {
            reject(new AggregateError([], "All promises were rejected"));
            return;
        }
        let rejectedCount = 0;
        const errors = new Array(promises.length);
        for (let i = 0; i < promises.length; i++) {
            Promise.resolve(promises[i])
                .then(value => {
                    // First fulfilled promise works
                    resolve(value);
                })
                .catch(error => {
                    errors[i] = error;
                    rejectedCount++;
                    // all promises are rejected
                    if (rejectedCount === promises.length) {
                        reject(
                            new AggregateError(
                                errors,
                                "All promises were rejected"
                            )
                        );
                    }
                });
        }
    })
}


const promise1 = Promise.reject(new Error("error"));
const promise2 = new Promise((resolve) => setTimeout(resolve, 100, "quick"));
const promise3 = new Promise((resolve) => setTimeout(resolve, 500, "slow"));

const promises = [promise1, promise2, promise3];

promiseAny(promises).then((value) => console.log(value));
// ///// all errors example
// promiseAny([Promise.reject(new Error("some error"))]).catch((e) => {
//     console.log(e instanceof AggregateError); // true
//     console.log(e.message); // "All Promises rejected"
//     console.log(e.name); // "AggregateError"
//     console.log(e.errors); // [ Error: "some error" ]
// });