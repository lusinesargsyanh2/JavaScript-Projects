const fetchData = fetch("https://randomuser.me/api/?results=20").then((res) => res.json()
);

fetchData.then((data) => {
    console.log("OLDER THEN 18");

    const users = data.results.filter((item) => item.dob.age > 18);
    console.log(users);

});

fetchData.then((data) => {
    const count = data.results.filter((item) => item.dob.age > 30).length;
    console.log(`${count} Users are older then 30`);

});

fetchData.then((data) => {
    console.log(`Names of all people younger than 25`);
    const users = data.results.filter((item) => item.dob.age < 25);
    // no such user
    users.forEach((user) => console.log(user.name.first)
    )
    if (users.length === 0) console.log("no user younger than 25");

});