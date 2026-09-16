const words = [
    "apple",
    "banana",
    "apple",
    "orange",
    "banana",
    "apple",
    "kiwi",
    "orange"
];
const map = new Map();
for (const word of words) {
    map.set(word, (map.get(word) || 0) + 1);
}
console.log(map);
