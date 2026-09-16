async function showName() {
    try {
        const name = await Promise.resolve("John");
        console.log("Hello", name);

    } catch (error) {
        console.log(error);

    }

}
showName();
// function getName2() {
//     return Promise.resolve("John");
// }

// async function showName() {
//     const name = await getName2();

//     console.log("Hello", name);
// }

// showName();