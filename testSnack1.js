async function fetchJson(url){
    const response = await fetch(url)
    return await response.json()
}

async function getData(query){
    const destinations = fetchJson(`https://boolean-spec-frontend.vercel.app/freetestapi/destinations?search=${query}`);
    const weathers = fetchJson(`https://boolean-spec-frontend.vercel.app/freetestapi/weathers?search=${query}`);
    const airports = fetchJson(`https://boolean-spec-frontend.vercel.app/freetestapi/airports?search=${query}`);

    const citiesPromises = [destinations, weathers, airports];


    const [destination, weather, airport] = await Promise.all(citiesPromises); 

    const results = {
        city: destination[0]?.name ?? null,
        country: destination[0]?.country ?? null,
        temperature: weather[0]?.temperature ?? null,
        airport: airport[0]?.name ?? null
    }

    return results;
}

getData('vienna')
    .then(data => {
        console.log(data)
        console.log(
            `${data.city} is in ${data.country}.\n` +
            `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n` +
            `The main airport is ${data.airport}.\n`
        );
    })
    .catch((error) => console.error(error));