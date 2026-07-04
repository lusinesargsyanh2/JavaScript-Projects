let arr = [10, 20, 30, 40];

for (let i = 0; i < arr.length - 1; i += 2) {
    [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
}

console.log(arr);
