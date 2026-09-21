const selectionSort = (arr) => {
    const n = arr.length;

    for (let i = 0; i < n; i++) {
        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[minIndex] > arr[j]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            [arr[minIndex], arr[i]] = [arr[i], arr[minIndex]];
        }

    }
}

const arr = [5, 3, 8, 4, 2];
selectionSort(arr);
console.log(arr);
// [2, 3, 4, 5, 8]


const arr2 = [1, 2, 3, 4, 5];
selectionSort(arr2)
console.log(arr2);
// [1, 2, 3, 4, 5]

const arr3 = [5, 4, 3, 2, 1];
selectionSort(arr3)
console.log(arr3);
// [1, 2, 3, 4, 5]

const arr4 = [];
selectionSort(arr4);
console.log(arr4);
// []

const arr5 = [1];
selectionSort(arr5)
console.log(arr5);
// [1]

const arr6 = [-3, 5, -1, 2, 0];
selectionSort(arr6);
console.log(arr6);
// [-3, -1, 0, 2, 5]

const arr7 = [5, 1, 5, 2, 5];
selectionSort(arr7)
console.log(arr7);
// [1, 2, 5, 5, 5]


// Space complexity
// O(1)

// Time complexity
// worst case O(n²)
// average case O(n²)
// best case O(n²)