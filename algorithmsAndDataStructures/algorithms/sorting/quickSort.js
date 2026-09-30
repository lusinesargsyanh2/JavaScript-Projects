const partition = (arr, low, high) => {
    const pivot = arr[low];

    let i = low + 1;
    let j = high;

    while (i <= j) {
        while (arr[i] <= pivot) i++;
        while (arr[j] > pivot) j--;
        if (i < j) {
            [arr[i], arr[j]] = [arr[j], arr[i]];
            i++;
            j--;
        }
    }
    [arr[low], arr[j]] = [arr[j], arr[low]];

    return j;
}

const quickSort = (arr, low = 0, high = arr.length - 1) => {
    if (low < high) {
        const pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
    return arr;
}



const arr = [5, 3, 8, 4, 2];
console.log(quickSort(arr));
// [2, 3, 4, 5, 8]

const arr2 = [1, 2, 3, 4, 5];
console.log(quickSort(arr2));
// [1, 2, 3, 4, 5]

const arr3 = [5, 4, 3, 2, 1];
console.log(quickSort(arr3));
// [1, 2, 3, 4, 5]

const arr4 = [];
console.log(quickSort(arr4));
// []

const arr5 = [1];
console.log(quickSort(arr5));
// [1]

const arr6 = [-3, 5, -1, 2, 0];
console.log(quickSort(arr6));
// [-3, -1, 0, 2, 5]

const arr7 = [5, 1, 5, 2, 5];
console.log(quickSort(arr7));
// [1, 2, 5, 5, 5]

// Space complexity
// O(1)

// Time complexity
// worst case O(n²) array is already sorted
// average case O(n²) array is already sorted
// best case O(n log n)

