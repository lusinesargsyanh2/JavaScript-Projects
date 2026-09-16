async function getMessage() {
    try {
        const message = await new Promise((resolve) => {
            setTimeout(() => {
                resolve("Hello!");
            }, 1000);
        });
        console.log(message);
    } catch (error) {
        console.log(error);
    }
}

getMessage()

// function getMessage() {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve("Hello!");
//         }, 1000);
//     });
// }

// getMessage()
//     .then((message) => {
//         console.log(message);
//     })
//     .catch((error) => {
//         console.log(error);
//     });