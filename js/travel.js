const url = 'https://travel-info-api.p.rapidapi.com/country-activities?country=italy';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '58792c7b93mshfe93538f5af7821p127bc4jsn8971d0ab8f0b',
		'X-RapidAPI-Host': 'travel-info-api.p.rapidapi.com'
	}
};

const travelAPI = async () => {

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        
        console.log(JSON.parse(result));
    } catch (error) {
        console.error(error);
    }
}

travelAPI();
