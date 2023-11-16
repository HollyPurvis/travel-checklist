const SEARCH_BUTTON = document.getElementById("search-country");

//makes sure user types input
function success() {
    if(document.querySelector("#destination-search").value === "") { 
        document.getElementById("search-country").disabled = true; 
        } else { 
            document.getElementById("search-country").disabled = false;
        }
}

function getCountry() {

    const countryInput = document.querySelector("#destination-search").value;

    console.log(countryInput) ;
}


const travelAPI = async () => {

    const china = getCountry();

    const url = 'https://travel-info-api.p.rapidapi.com/country-activities?country=YoneLane';
    const test = `https://travel-info-api.p.rapidapi.com/country-activities?country=${china}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '58792c7b93mshfe93538f5af7821p127bc4jsn8971d0ab8f0b',
            'X-RapidAPI-Host': 'travel-info-api.p.rapidapi.com'
        }
    };
    try {
        
        const response = await fetch(url, options);
        const result = await response.text();
        

        console.log(JSON.parse(result));
    } catch (error) {
        alert("Please enter a valid country")
        console.error(error);
    }
}


SEARCH_BUTTON.addEventListener("click", () => {
    travelAPI();

});


