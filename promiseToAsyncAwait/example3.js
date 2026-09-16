async function getInfo() {
    try {
        const name = await Promise.resolve("Albert");
        console.log(name);

        const age = await Promise.resolve(23);
        console.log(age);
    } catch (error) {
        console.log(error);

    }
}
getInfo()

// function getName() {
//     return Promise.resolve("Albert");
// }

// function getAge() {
//     return Promise.resolve(23);
// }

// getName()
//     .then((name) => {
//         console.log(name);

//         return getAge();
//     })
//     .then((age) => {
//         console.log(age);
//     });