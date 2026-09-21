const bubbleSort = (arr) => {
    const n = arr.length
    for (let i = 0; i < n - 1; i++) {
        let swapped = false; // if array is sorted loop works once
        for (let j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
        }
        if (!swapped) {
            break
        }

    }
}
const arr = [5, 3, 8, 4, 2];
bubbleSort(arr);
console.log(arr);
// [2, 3, 4, 5, 8]

const arr2 = [1, 2, 3, 4, 5];
bubbleSort(arr2)
console.log(arr2);
// [1, 2, 3, 4, 5]

const arr3 = [5, 4, 3, 2, 1];
bubbleSort(arr3)
console.log(arr3);
// [1, 2, 3, 4, 5]

const arr4 = [];
bubbleSort(arr4);
console.log(arr4);
// []

const arr5 = [1];
bubbleSort(arr5)
console.log(arr5);
// [1]

const arr6 = [-3, 5, -1, 2, 0];
bubbleSort(arr6);
console.log(arr6);
// [-3, -1, 0, 2, 5]

const arr7 = [5, 1, 5, 2, 5];
bubbleSort(arr7)
console.log(arr7);
// [1, 2, 5, 5, 5]


// Space complexity
// O(1)

// Time complexity
// worst case O(n²)
// average case O(n²)
// best case O(n) array is already sorted