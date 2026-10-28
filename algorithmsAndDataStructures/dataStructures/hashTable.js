const errorMessage = {
    capacity: "Capacity must be a positive integer",
    loadFactor: "Max load factor must be positive, finite, and between 0 and 1"
}
function isPrime(n) {
    if (n < 2) return false;

    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) {
            return false;
        }
    }

    return true;
}

function nextPrime(n) {
    let candidate = n + 1;

    while (!isPrime(candidate)) {
        candidate++;
    }

    return candidate;
}

class HashTable {
    constructor(initialCapacity = 11, maxLoadFactor = 1.0) {

        if (!Number.isInteger(initialCapacity) || initialCapacity < 1) {
            throw new Error(errorMessage.capacity);
        }

        if (!(maxLoadFactor > 0 && maxLoadFactor <= 1) || !Number.isFinite(maxLoadFactor)) {
            throw new Error(errorMessage.loadFactor);
        }

        this.capacity = isPrime(initialCapacity)
            ? initialCapacity
            : nextPrime(initialCapacity);

        this.maxLoadFactor = maxLoadFactor;
        this.size = 0;
        this.buckets = new Array(this.capacity)
            .fill(null)
            .map(() => []);

    }

    _hash(key) {
        const str = String(key);
        let hash = 0;

        for (let i = 0; i < str.length; i++) {
            hash = (hash * 31 + str.charCodeAt(i)) % this.capacity;
        }

        return hash;
    }

    _sameKey(a, b) {
        return a === b || (a !== a && b !== b); // (a !== a && b !== b) check for NaN
    }

    // current load factor
    loadFactor() {
        return this.size / this.capacity;
    }


    has(key) {
        let index = this._hash(key);
        const bucket = this.buckets[index];

        return bucket.some(el => el.key === key);

    }

    get(key) {
        let index = this._hash(key);
        const bucket = this.buckets[index];
        const find = bucket.find(el => el.key === key)

        return find ? find.value : undefined;
    }

    set(key, value) {
        const index = this._hash(key);
        const bucket = this.buckets[index];

        const exists = bucket.find(el => el.key === key);

        if (exists) {
            exists.value = value;
            return this;
        }

        // add new
        bucket.push({ key, value });
        this.size++;

        if (this.loadFactor() > this.maxLoadFactor) {
            this.resize();
        }

        return this;

    }

    getSize() {
        return this.size;
    }

    delete(key) {
        const index = this._hash(key);
        const bucket = this.buckets[index];

        const entryIndex = bucket.findIndex(
            item => item.key === key
        );

        if (entryIndex === -1) {
            return false;
        }

        bucket.splice(entryIndex, 1);
        this.size--;

        return true;
    }

    *keys() {
        for (const bucket of this.buckets) {
            for (const entry of bucket) {
                yield entry.key;
            }
        }
    }

    *values() {
        for (const bucket of this.buckets) {
            for (const entry of bucket) {
                yield entry.value;
            }
        }
    }

    *entries() {
        for (const bucket of this.buckets) {
            for (const entry of bucket) {
                yield [entry.key, entry.value];
            }
        }
    }

    resize() {
        const oldBuckets = this.buckets;

        this.capacity = nextPrime(this.capacity * 2);

        this.buckets = Array(this.capacity)
            .fill(null)
            .map(() => []);

        // Rehash every entry because the capacity has changed.
        for (const bucket of oldBuckets) {
            for (const entry of bucket) {
                const index = this._hash(entry.key);
                this.buckets[index].push(entry);
            }
        }
    }

    clear() {
        this.buckets = new Array(this.capacity)
            .fill(null)
            .map(() => []);

        this.size = 0;
    }

    *[Symbol.iterator]() {
        yield* this.entries();
    }
}


const table = new HashTable(5, 0.75);
////// test cases
console.log("=== 1. set() ===");

table.set("name", "James");
table.set("age", 28);
table.set("city", "New York");
table.set("job", "Developer");

console.log(table.buckets);
console.log("Size:", table.getSize());


console.log("\n=== 2. get() ===");

console.log(table.get("name")); // James
console.log(table.get("age"));  // 28
console.log(table.get("email")); // undefined


console.log("\n=== 3. has() ===");

console.log(table.has("name"));  // true
console.log(table.has("email")); // false


console.log("\n=== 4. Updating an existing key ===");

table.set("name", "Michael");

console.log(table.get("name")); // Michael
console.log("Size:", table.getSize()); // 4


console.log("\n=== 5. keys() ===");

console.log([...table.keys()]);
// Example: ["name", "age", "city", "job"]


console.log("\n=== 6. values() ===");

console.log([...table.values()]);
// Example: ["Michael", 28, "New York", "Developer"]


console.log("\n=== 7. entries() ===");

console.log([...table.entries()]);
// Example:
// [
//   ["name", "Michael"],
//   ["age", 28],
//   ["city", "New York"],
//   ["job", "Developer"]
// ]


console.log("\n=== 8. Symbol.iterator ===");

for (const [key, value] of table) {
    console.log(`${key}: ${value}`);
}


console.log("\n=== 9. delete() ===");

console.log(table.delete("city")); // true
console.log(table.delete("email")); // false

console.log("Has city:", table.has("city")); // false
console.log("Size:", table.getSize());


console.log("\n=== 10. clear() ===");

table.clear();

console.log("Size:", table.getSize()); // 0
console.log("Keys:", [...table.keys()]); // []
console.log("Values:", [...table.values()]); // []
console.log("Capacity:", table.capacity); // Capacity remains unchanged


console.log("\n=== 11. Collision test ===");

const collisionTable = new HashTable(5);

collisionTable.set("name", "James");
collisionTable.set("mane", "Robert");

console.log("Buckets:", collisionTable.buckets);
console.log("James:", collisionTable.get("name"));
console.log("Robert:", collisionTable.get("mane"));
