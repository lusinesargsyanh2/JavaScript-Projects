const fetchData = fetch('https://jsonplaceholder.typicode.com/posts?userId=2')
    .then((response) => response.json());

fetchData.then((posts) => {
    console.log(`user has ${posts.length} posts`);
});

fetchData.then((posts) => {
    console.log(`Posts titles`);
    posts.forEach((post) => console.log(post.title)
    );
});

fetchData.then((posts) => {
    const post = posts.find((post) => post.id === 15);
    post ? console.log(post) : console.log("not found");
})