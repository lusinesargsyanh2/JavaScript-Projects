const cumulativeCountingSort = (arr) => {
    if (arr.length <= 1) {
        return arr;
    }
    const min = Math.min(...arr);
    const max = Math.max(...arr);
    const range = (max - min) + 1;
    const n = arr.length;
    const countArr = new Array(range).fill(0);


    for (let i = 0; i < n; i++) {
        countArr[arr[i] - min]++;
    }

    // Make cumulative
    for (let i = 1; i < countArr.length; i++) {
        countArr[i] += countArr[i - 1];
    }
    const result = new Array(arr.length);

    for (let i = arr.length - 1; i >= 0; i--) {
        const num = arr[i];
        const index = num - min;

        result[countArr[index] - 1] = num;
        countArr[index]--;
    }
    return result
}


const arr = [5, 3, 8, 4, 2];
console.log(cumulativeCountingSort(arr));
// [2, 3, 4, 5, 8]


const arr2 = [1, 2, 3, 4, 5];
console.log(cumulativeCountingSort(arr2));
// [1, 2, 3, 4, 5]

const arr3 = [5, 4, 3, 2, 1];
console.log(cumulativeCountingSort(arr3));
// [1, 2, 3, 4, 5]

const arr4 = [];
console.log(cumulativeCountingSort(arr4));
// []

const arr5 = [1];
console.log(cumulativeCountingSort(arr5));
// [1]

const arr6 = [-3, 5, -1, 2, 0];
console.log(cumulativeCountingSort(arr6));
// [-3, -1, 0, 2, 5]

const arr7 = [5, 1, 5, 2, 5];
console.log(cumulativeCountingSort(arr7));
// [1, 2, 5, 5, 5]


// Space complexity
// O(n+k)

// Time complexity
// O(n+k)