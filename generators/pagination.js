function* paginate(array, pageSize) {
    for (let i = 0; i < array.length; i += pageSize) {
        yield array.slice(i, i + pageSize);

    }
}
const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const pages = paginate(data, 2);

console.log(pages.next().value);
console.log(pages.next().value);
console.log(pages.next().value);
console.log(pages.next().value);
console.log(pages.next().value); 
