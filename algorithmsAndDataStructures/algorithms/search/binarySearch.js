
const binarySearch = (arr, target) => {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}


const arr = [5, 12, 15, 20, 25, 26, 29, 35, 45, 50];
const target = 35;
const target2 = 60;
const target3 = 12;

console.log(binarySearch(arr, target)); // 7
console.log(binarySearch(arr, target2)); // -1
console.log(binarySearch(arr, target3)); // 1

// Space complexity
// O(1)

// Time complexity
// worst case O(log n)
// average case O(log n)
// best case O(1)