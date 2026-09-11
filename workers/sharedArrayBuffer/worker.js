self.onmessage = (event) => {
    const arr = event.data;

    arr[1] = 11;
    arr[2] = 12;

    self.postMessage(arr);
}