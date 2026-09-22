const insertionSort = (arr) => {
    for (let i = 1; i < arr.length; i++) {
        let j = i - 1;
        const currVal = arr[i];

        while (j >= 0 && arr[j] > currVal) {
            arr[j + 1] = arr[j];
            j--;
        }

        arr[j + 1] = currVal;

    }
    return arr;
}


const arr = [5, 3, 8, 4, 2];
console.log(insertionSort(arr));
// [2, 3, 4, 5, 8]

const arr2 = [1, 2, 3, 4, 5];
console.log(insertionSort(arr2));
// [1, 2, 3, 4, 5]

const arr3 = [5, 4, 3, 2, 1];
console.log(insertionSort(arr3));
// [1, 2, 3, 4, 5]

const arr4 = [];
console.log(insertionSort(arr4));
// []

const arr5 = [1];
console.log(insertionSort(arr5));
// [1]

const arr6 = [-3, 5, -1, 2, 0];
console.log(insertionSort(arr6));
// [-3, -1, 0, 2, 5]

const arr7 = [5, 1, 5, 2, 5];
console.log(insertionSort(arr7));
// [1, 2, 5, 5, 5]


// Space complexity
// O(1)

// Time complexity
// worst case O(n²)
// average case O(n²)
// best case O(n) array is already sorted