self.onmessage = (event) => {
    const arr = event.data;

    for (let i = 0; i < arr.length; i++) {
        arr[i] *= 2;

    }

    self.postMessage(arr);
}