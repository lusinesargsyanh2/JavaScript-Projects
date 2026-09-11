const worker = new Worker("worker.js");

worker.postMessage("Hello from Main Thread");

worker.onmessage = (event) => {
    console.log(event.data);
}