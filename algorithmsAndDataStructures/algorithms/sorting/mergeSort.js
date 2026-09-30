const mergeSort = (arr, left = 0, right = arr.length - 1) => {
    if (left >= right) return;
    const mid = Math.floor((left + right) / 2)
    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);
    merge(arr, left, mid, right);

}

const merge = (arr, left, mid, right) => {
    const a1 = arr.slice(left, mid + 1);
    const a2 = arr.slice(mid + 1, right + 1);

    let i = 0;
    let j = 0;
    let k = left;

    while (i < a1.length && j < a2.length) {
        if (a1[i] > a2[j]) {
            arr[k++] = a2[j++];
        } else {
            arr[k++] = a1[i++];
        }
    }

    while (i < a1.length) {
        arr[k++] = a1[i++];
    }

    while (j < a2.length) {
        arr[k++] = a2[j++];
    }

}
const arr = [5, 3, 8, 4, 2];
mergeSort(arr);
console.log(arr);
// [2, 3, 4, 5, 8]

const arr2 = [1, 2, 3, 4, 5];
mergeSort(arr2)
console.log(arr2);
// [1, 2, 3, 4, 5]

const arr3 = [5, 4, 3, 2, 1];
mergeSort(arr3)
console.log(arr3);
// [1, 2, 3, 4, 5]

const arr4 = [];
mergeSort(arr4);
console.log(arr4);
// []

const arr5 = [1];
mergeSort(arr5)
console.log(arr5);
// [1]

const arr6 = [-3, 5, -1, 2, 0];
mergeSort(arr6);
console.log(arr6);
// [-3, -1, 0, 2, 5]

const arr7 = [5, 1, 5, 2, 5];
mergeSort(arr7)
console.log(arr7);
// [1, 2, 5, 5, 5]


// Space complexity
// O(n)

// Time complexity
// worst case - O(n log n)
// average case - O(n log n)
// best case - O(n log n)