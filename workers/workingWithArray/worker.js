self.onmessage = (event) => {
    const arr = event.data;

    const max = Math.max(...arr);

    self.postMessage(max);
}