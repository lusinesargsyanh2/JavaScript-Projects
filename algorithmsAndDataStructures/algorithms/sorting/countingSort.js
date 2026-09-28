const countingSort = (arr) => {
    if (arr.length <= 1) {
        return arr;
    }
    const min = Math.min(...arr);
    const max = Math.max(...arr);
    const range = (max - min) + 1;
    const n = arr.length;
    const countArr = new Array(range).fill(0);
    const res = [];

    for (let i = 0; i < n; i++) {
        countArr[arr[i] - min]++;
    }

    for (let i = 0; i < countArr.length; i++) {
        while (countArr[i] > 0) {
            res.push(i + min);
            countArr[i]--;
        }
    }

    return res;
}



const arr = [5, 3, 8, 4, 2];
console.log(countingSort(arr));
// [2, 3, 4, 5, 8]


const arr2 = [1, 2, 3, 4, 5];
console.log(countingSort(arr2));
// [1, 2, 3, 4, 5]

const arr3 = [5, 4, 3, 2, 1];
console.log(countingSort(arr3));
// [1, 2, 3, 4, 5]

const arr4 = [];
console.log(countingSort(arr4));
// []

const arr5 = [1];
console.log(countingSort(arr5));
// [1]

const arr6 = [-3, 5, -1, 2, 0];
console.log(countingSort(arr6));
// [-3, -1, 0, 2, 5]

const arr7 = [5, 1, 5, 2, 5];
console.log(countingSort(arr7));
// [1, 2, 5, 5, 5]


// Space complexity
// O(n+k)

// Time complexity
// worst case - larger then O(n+k) smaller then O(n*k)
// average case - larger then O(n+k) smaller then O(n*k)
// best case - larger then O(n+k) smaller then O(n*k)
