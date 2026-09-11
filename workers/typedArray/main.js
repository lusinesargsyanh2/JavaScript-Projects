const worker = new Worker("worker.js");
// run npx serve
const buffer = new ArrayBuffer(5);


let array = new Uint8Array(buffer);
array.set([10, 20, 30, 40, 50])

worker.postMessage(array);

worker.onmessage = (event) => {
    console.log(`returned array: `, event.data);
}
