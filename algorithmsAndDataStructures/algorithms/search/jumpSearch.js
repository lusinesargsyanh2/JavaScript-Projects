const jumpSearch = (arr, target) => {

    const arrLength = arr.length;

    if (arrLength === 0) { // empty array
        return -1;
    }

    const jumpSize = Math.floor(Math.sqrt(arrLength));
    let prev = 0;
    let curr = jumpSize;

    // Find the block where the target may exist
    while (curr < arrLength && arr[Math.min(curr, arrLength - 1)] < target) {
        prev = curr;
        curr += jumpSize;
    }
    const end = Math.min(curr, arrLength);
    // find index
    while (prev < end &&
        arr[prev] < target) {
        prev++;
    }

    if (arr[prev] === target) {
        return prev;
    }
    return -1;
}

const arr = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31];
const arr2 = [1, 3, 3, 3, 5, 7, 9, 11, 11, 13, 15] // Duplicate values
const arr3 = [5];


console.log(jumpSearch(arr, 23)); // 11
console.log(jumpSearch(arr, 40)); // -1 not exist
console.log(jumpSearch(arr, 5)); // 2 
console.log(jumpSearch(arr, 29)); // 14 
console.log(jumpSearch(arr, 16)); // -1 not exist
console.log(jumpSearch(arr, 1)); // 0 
console.log(jumpSearch(arr, 31)); // 15 
console.log(jumpSearch(arr2, 3)); // 1  Duplicate values
console.log(jumpSearch(arr3, 8)); // -1 array length is 1 
console.log(jumpSearch(arr3, 5)); // 0 array length is 1 
console.log(jumpSearch([], 5)); // -1


// Large input
const largeArr = Array.from(
    { length: 1_000_000 },
    (_, i) => i * 2
);
console.log(jumpSearch(largeArr, 999998)); // 499999

// Space complexity
// O(1)

// Time complexity
// worst case O(√n)
// average case O(√n)
// best case O(1)