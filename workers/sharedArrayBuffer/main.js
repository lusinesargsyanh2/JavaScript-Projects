const worker = new Worker("worker.js");
// node server.js 
const buffer = new SharedArrayBuffer(16);


let array = new Uint16Array(buffer);
array[0] = 10;
array[1] = 20;
array[2] = 30;
array[3] = 40;


worker.postMessage(array);

worker.onmessage = (event) => {
    console.log("result:", array);
}
