const cities = async query => {
    const city = await fetch(query);
    const cityJson = await city.json()
    return cityJson;
}



async function getDashboardData(query) {
    try {

        const destinationPromise = cities(`https://boolean-spec-frontend.vercel.app/freetestapi/destinations?search=${query}`);
        const weathersPromise = cities(`https://boolean-spec-frontend.vercel.app/freetestapi/weathers?search=${query}`);
        const airportPromise = cities(`https://boolean-spec-frontend.vercel.app/freetestapi/airports?search=${query}`);

        const allCities = [destinationPromise, weathersPromise, airportPromise];
        const [destinations, weathers, airports] = await Promise.all(allCities);
        
        return {
            city: destinations[0]?.name ?? null,
            country: destinations[0]?.country ?? null,
            temperature: weathers[0]?.temperature ?? null,
            weather: weathers[0]?.weather_description ?? null,
            airport: airports[0]?.name ?? null
        }
    }catch(error){
        console.error(`Errore nei recuperi dei dati ${error}`);
    }
}

getDashboardData('vienna')
    .then(data => {
        console.log(data);
        let message = '';

        if (data.city !== null && data.country !== null){
            message += `${data.city} is in ${data.country}.\n`;   
        }

        if (data.temperature !== null && data.weather !== null){
            message += `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n`;
        }

        if (data.airport !== null){
            message += `The main airport is ${data.airport}.\n`;
        } 

        console.log(message);
    })
    .catch(error => console.error(error))




