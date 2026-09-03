class MyPromise {
    constructor(executor) {
        this.state = "pending";
        this.value = undefined;
        this.reason = undefined;

        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];

        const resolve = (value) => {
            if (this.state !== "pending") return;

            this.value = value;
            this.state = "fulfilled";
            this.onFulfilledCallbacks.forEach((callback) => {
                queueMicrotask(() => callback(this.value));
            });
        }

        const reject = (reason) => {
            if (this.state !== "pending") return;
            this.reason = reason;
            this.state = "rejected";
            this.onRejectedCallbacks.forEach((callback) => {
                queueMicrotask(() => callback(this.reason));
            });
        }

        try {
            executor(resolve, reject);
        } catch (error) {
            reject(error);
        }
    }

    then(onFulfilled, onRejected) {

        return new MyPromise((resolve, reject) => {
            const handleFulfilled = (value) => {
                try {

                    if (typeof onFulfilled !== "function") {
                        resolve(value);

                        return;
                    }
                    const result = onFulfilled(value);

                    if (result instanceof MyPromise) {
                        result.then(resolve, reject);
                    } else {
                        resolve(result);
                    }
                } catch (err) {
                    reject(err)
                }

            }
            const handleReject = (reason) => {
                try {

                    if (typeof onRejected !== "function") {
                        reject(reason);
                        return;
                    }

                    const result = onRejected(reason);

                    if (result instanceof MyPromise) {
                        result.then(resolve, reject);
                    } else {
                        resolve(result);
                    }
                } catch (err) {
                    reject(err)
                }

            }

            if (this.state === "fulfilled") {
                queueMicrotask(() => handleFulfilled(this.value))
            } else if (this.state === "rejected") {
                queueMicrotask(() => handleReject(this.reason))
            } else {
                this.onFulfilledCallbacks.push((value) => handleFulfilled(value));
                this.onRejectedCallbacks.push((reject) => handleReject(reject));
            }
        })
    }

    catch(onRejected) {
        return this.then(null, onRejected);
    }
}


// console.log("--- Test 1: Basic Async & Chaining ---");

// const p1 = new MyPromise((resolve) => {
//     setTimeout(() => resolve(10), 300);
// });

// p1.then((val) => {
//     console.log("Step 1:", val);
//     return val * 2;
// }).then((val2) => {
//     console.log("Step 2:", val2);
// });

// // //////////////////////////////////////////////////

// console.log("--- Test 2: Nested Promise Resolution ---");
// new MyPromise((resolve) => {
//     setTimeout(() => resolve(5), 300);
// })
//     .then((val) => {
//         console.log("Step 1 received:", val);
//         return new MyPromise((resolve) => {
//             setTimeout(() => resolve(val + 100), 300);
//         });
//     })
//     .then((finalVal) => {
//         console.log("Final step awaited nested promise:", finalVal);
//     });

// // //////////////////////////////////////////////////

// console.log("--- Test 3: Error Handling & Recovery via Catch ---");
// new MyPromise((resolve, reject) => {
//     setTimeout(() => reject("Server down"), 300);
// })
//     .then((val) => {
//         console.log("Should not run:", val);
//     })
//     .catch((err) => {
//         console.log("Caught error:", err);
//         return "Recovered from backup";
//     })
//     .then((recoveredVal) => {
//         console.log("Chain revived:", recoveredVal);
//     });

// // //////////////////////////////////////////////////

// console.log("--- Test 4: Passthrough ---");
// new MyPromise((resolve) => {
//     resolve("Secret Code 777");
// })
//     .then(null, (err) => {
//         console.log("No error, this callback is skipped");
//     })
//     .then((val) => {
//         console.log("Value passed through:", val);
//     });

// // //////////////////////////////////////////////////

// console.log("--- Test 5: Exception Interception (try/catch) ---");
// new MyPromise((resolve) => {
//     resolve(10);
// })
//     .then((val) => {
//         throw new Error("Crash in user code!");
//     })
//     .then(
//         (val) => console.log("Success (should not run):", val),
//         (err) => console.log("Internal try/catch caught throw:", err.message)
//     );

// // //////////////////////////////////////////////////

// console.log("--- Test 6: Multiple Subscribers (Pending State) ---");
// const pendingPromise = new MyPromise((resolve) => {
//     setTimeout(() => resolve("Shared Data"), 300);
// });

// pendingPromise.then((val) => console.log("Subscriber 1:", val));
// pendingPromise.then((val) => console.log("Subscriber 2:", val));
// pendingPromise.then((val) => console.log("Subscriber 3:", val));
