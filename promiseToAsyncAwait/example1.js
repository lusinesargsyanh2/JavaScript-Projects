async function getNumber() {
    try {
        const number = await new Promise((resolve) => {
            resolve(10);
        });
        console.log(number * 2);

    } catch (error) {
        console.log(error);
    }
}
getNumber()

//// example without async await
// function getNumber() {
//     return new Promise((resolve) => {
//         resolve(10);
//     });
// }

// getNumber()
//     .then((number) => {
//         console.log(number * 2);
//     })
//     .catch((error) => {
//         console.log(error);
//     });