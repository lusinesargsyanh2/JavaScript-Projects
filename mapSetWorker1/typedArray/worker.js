self.onmessage = (event) => {
    const array = new Uint32Array(event.data);
    // const newArray = array.forEach(val => val * 2)

    for (let i = 0; i < array.length; i++) {
        array[i] *= 2;

    }

    self.postMessage(array);

}