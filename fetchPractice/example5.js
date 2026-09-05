const fetchData = fetch('https://jsonplaceholder.typicode.com/todos?userId=3')
    .then((response) => response.json());

fetchData.then(data => {
    console.log("COMPLETED");
    const items = data.filter((item) => item.completed);
    console.log(items);
    console.log(`Completed ${items.length} of ${data.length}`);

})

fetchData.then(data => {
    console.log("INCOMPLETE");
    const items = data.filter((item) => !item.completed);
    console.log(items);
})