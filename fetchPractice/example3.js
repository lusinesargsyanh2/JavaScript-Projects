const fetchData = fetch(" https://fakestoreapi.com/products").then((response) => response.json());

fetchData.then((products) => {
    console.log("NAMES");

    const items = products.filter((item) => item.price < 50);
    for (item of products) {
        console.log(item.title);

    }
})

fetchData.then(products => {
    console.log("MOST EXPENSIVE PRODUCT");
    const expensiveProduct = products.reduce((max, product) => product.price > max.price ? product : max)

    console.log(expensiveProduct);
})

fetchData.then(products => {
    console.log(`Print only products from the "electronics" category`);
    const items = products.filter((item) => item.category === "electronics");
    console.log(items);
})

fetchData.then(products => {
    const averagePrice = Math.round(
        products.reduce((sum, product) => {
            return sum + product.price;
        }, 0) / products.length);
    console.log(`average price is ${averagePrice}`);

})