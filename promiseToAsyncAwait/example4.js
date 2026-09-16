async function calculate() {
    try {
        const number = await Promise.resolve(5);
        console.log(number * 3);
    } catch (error) {
        console.log(error);

    }
}
calculate();

// function getNumber2() {
//     return Promise.resolve(5);
// }

// async function calculate() {
//     const number = await getNumber2();

//     console.log(number * 3);
// }

// calculate();