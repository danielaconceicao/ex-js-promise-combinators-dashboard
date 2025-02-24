const getUser = async id => {
    const response = await fetch(`https://dummyjson.com/users/${id}`);
    const user = await response.json();
    return user;
}



(async () => {

    const promise = []
    for(let id = 1; id <= 5; id ++){
        const userPromise = getUser(id);
        promise.push(userPromise);
    }
    const users = await Promise.all(promise);
    console.log(users);
})();