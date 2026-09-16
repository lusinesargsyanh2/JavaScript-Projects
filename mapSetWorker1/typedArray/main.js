const buffer = new ArrayBuffer(20);
const array = new Uint32Array(buffer);
array.set([10,
    20,
    30,
    40,
    50,
])
const worker = new Worker("worker.js");

// worker.postMessage(array);
worker.postMessage(buffer, [buffer]);

worker.onmessage = (event) => {
    console.log(event.data);
}