const ids = [
    101, 205, 101, 307,
    205, 412, 307, 500,
    101, 412
];
const unique = new Set(ids)
console.log(unique);
console.log(unique.size);
console.log(unique.has(307));
console.log(unique.has(999));

unique.add(600);
unique.delete(205)
console.log(unique);
