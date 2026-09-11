const worker = new Worker("worker.js");
// run npx serve
const buffer = new ArrayBuffer(18);


let array = new Uint16Array(buffer);
array.set([12, 45, 7, 89, 23, 56, 91, 3, 67])

worker.postMessage(array);

worker.onmessage = (event) => {
    console.log(`largest number is ${event.data}`);
}
