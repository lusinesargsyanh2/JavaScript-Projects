class MyPromise {
    constructor(executor) {
        this.state = "pending";
        this.value = undefined;
        this.reason = undefined;

        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];

        const resolve = (value) => {
            if (this.state !== "pending") return;

            // if we return promise
            if (value instanceof MyPromise) {
                value.then(resolve, reject);
                return;
            }

            this.value = value;
            this.state = "fulfilled";
            this.onFulfilledCallbacks.forEach((callback) => {
                queueMicrotask(callback);
            });
        }

        const reject = (reason) => {
            if (this.state !== "pending") return;
            this.reason = reason;
            this.state = "rejected";
            this.onRejectedCallbacks.forEach((callback) => {
                queueMicrotask(callback);
            });
        }

        try {
            executor(resolve, reject);
        } catch (error) {
            reject(error);
        }
    }

    then(onFulfilled, onRejected) {
        onFulfilled = onFulfilled || ((value) => value);

        onRejected = onRejected || ((reason) => {
            throw reason;
        });
        return new MyPromise((resolve, reject) => {
            const handleFulfilled = () => {
                try {
                    const result = onFulfilled(this.value);
                    resolve(result);
                } catch (err) {
                    reject(err)
                }

            }
            const handleReject = () => {
                try {
                    const result = onRejected(this.reason);
                    resolve(result);
                } catch (err) {
                    reject(err)
                }

            }

            if (this.state === "fulfilled") {
                queueMicrotask(() => handleFulfilled(this.value))
            }
            if (this.state === "rejected") {
                queueMicrotask(() => handleReject(this.reason))
            }

            if (this.state === "pending") {
                this.onFulfilledCallbacks.push(handleFulfilled);
                this.onRejectedCallbacks.push(handleReject);
            }
        })
    }

    catch(onRejected) {
        return this.then(null, onRejected);
    }

    finally(callback) {
        return this.then(
            (value) => {
                callback();
                return value;
            },
            (reason) => {
                callback();
                throw reason;
            }
        );
    }
}

console.log('start');
//// example 1
const promise = new MyPromise((resolve) => {
    resolve(10);
});

promise
    .then((value) => {
        console.log(value); // 10

        return new MyPromise((resolve) => {
            setTimeout(() => {
                resolve(20);
            }, 1000);
        });
    })
    .then((value) => {
        console.log(value); // 20
    });

//// example 2
const promise1 = new MyPromise((resolve, reject) => {
    reject("Something went wrong");
});

promise1.catch((error) => {
    console.log("Test 2:", error);
});

//// example 3
const p = new MyPromise((resolve) => {
    setTimeout(() => {
        resolve(10);
    }, 1000);
});

p.then((value) => {
    console.log("3 first:", value);
});

p.then((value) => {
    console.log("3 second:", value);
});

p.then((value) => {
    console.log("3 third:", value);
});

//// example 4
const p1 = new MyPromise((resolve) => {
    resolve(10);
});

p1.then((value) => {
    console.log("4 1:", value);
    return value * 2;
})
    .then((value) => {
        console.log("4 2:", value);
        return value + 5;
    })
    .then((value) => {
        console.log("4 3:", value);
    })
    .finally(() => {
        console.log("cleanup");
    });

p1.then((value) => {
    console.log("5 1:", value);
    throw new Error("receive error");
    return value * 2;
})
    .then((value) => {
        console.log("5 2:", value);

        return value + 5;
    })
    .catch((error) => {
        console.log("Test 5 3:", error.message);
    })
    .then((value) => {
        console.log("5 Last:", value);
    });
console.log("end");
