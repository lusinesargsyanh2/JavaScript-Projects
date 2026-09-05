const fetchData = fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json());

fetchData.then((users) => {
    console.log("NAMES");
    users.forEach(user =>
        console.log(user.name)
    )
});


fetchData.then((users) => {
    console.log("EMAIL");
    users.forEach(user =>
        console.log(user.email)
    )
});

fetchData.then((users) => {
    console.log("SINGLE USER");
    const user = users.find(user => user.username === 'Bret');
    console.log(user);

})