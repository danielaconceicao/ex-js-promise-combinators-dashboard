const cities = async query => {
    const city = await fetch(query);
    const cityJson = await city.json();
    return cityJson;
}



async function getDashboardData(query) {
    try {

        const destinationPromise = cities(`https://boolean-spec-frontend.vercel.app/freetestapi/destinations?search=${query}`);
        const weathersPromise = cities(`https://boolean-spec-frontend.vercel.app/freetestapi/weathers?search=${query}`);
        const airportPromise = cities(`https://boolean-spec-frontend.vercel.app/freetestapi/airports?search=${query}`);

        const allCities = [destinationPromise, weathersPromise, airportPromise];
        const [destinations, weathers, airports] = await Promise.allSettled(allCities);

        const data = {};

        if (destinations.status === 'rejected'){
            console.error(destinations.reason);

            data.city = null;
            data.country = null;
        }else{
            const destination = destinations.value[0];
            data.city = destination ? destination.name : null;
            data.country = destination ? destination.country : null;
        }

        if(weathers.status === 'rejected'){
            console.error(weathers.reason);
            data.temperature = null;
            data.weather = null;
        }else{
            const weather = weathers.value[0];
            data.temperature = weather ? weather.temperature : null;
            data.weather = weather ? weather.weather_description : null;
        }

        if (airports.status === 'rejected') {
            console.error(airports.reason);
            data.airports = null;
        } else {
            const airport = airports.value[0];
            data.airport = airport ? airport.name : null;
        }

        return data
    } catch (error) {
        console.error(`Errore nei recuperi dei dati ${error}`);
    }
} 

getDashboardData('vienna')
    .then(data => {
        console.log(data);
        let message = '';

        if (data.city !== null && data.country !== null) {
            message += `${data.city} is in ${data.country}.\n`;
        }

        if (data.temperature !== null && data.weather !== null) {
            message += `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n`;
        }

        if (data.airport !== null) {
            message += `The main airport is ${data.airport}.\n`;
        }

        console.log(message);
    })
    .catch(error => console.error(error));
