const nestedObj = {
    a: true,
    b: "hello",
    c: true,
    nested1: {
        d: true,
        e: 0,
        f: "1",
        nested2: {
            g: false,
            h: false,
            i: true,
        }
    }
}

function check(array) {
    let count = 0;

    for (const index in array) {
        if (typeof array[index] === "boolean" && array[index] === true) {
            ++count;

        } else if (typeof array[index] === "object") {

            count += check(array[index]);
        }
    }
    return count;


}
console.log(check(nestedObj));
