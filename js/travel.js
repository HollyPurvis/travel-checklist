const SEARCH_BUTTON = document.getElementById("search-country");
const TODO_CONTAINER = document.getElementById("todos");
const TODO_TEMPLATE = document.getElementById("toDoTemplate");

let toDo = []

//makes sure user types input
function success() {
    if(document.querySelector("#destination-search").value === "") { 
        document.getElementById("search-country").disabled = true; 
        } else { 
            document.getElementById("search-country").disabled = false;
        }
}

// get country from input field
function getCountry() {

    const countryInput = document.querySelector("#destination-search").value;

    return countryInput;
}

function empty(element) {
    element.replaceChildren(); 
 }

const travelAPI = async () => {

    empty(TODO_CONTAINER);
    const country = getCountry();

    const url = 'https://travel-info-api.p.rapidapi.com/country-activities?country=YoneLane';
    const test = `https://travel-info-api.p.rapidapi.com/country-activities?country=${country}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '58792c7b93mshfe93538f5af7821p127bc4jsn8971d0ab8f0b',
            'X-RapidAPI-Host': 'travel-info-api.p.rapidapi.com'
        }
    };
    try {
        
        const response = await fetch(test, options);
        const result = await response.text();
        

        toDo = JSON.parse(result);

    } catch (error) {
        alert("Please enter a valid country")
        console.error(error);
    }

    // document.getElementById("activity1").innerHTML = toDo.data.activities[0].title;
    console.log(toDo);

    for(let i = 1; i < 5; i++){

        let h2Title = document.createElement("H2");
        h2Title.setAttribute("class", "title");
        h2Title.innerHTML = toDo.data.activities[i].title
        let activity = document.createElement("p");
        activity.setAttribute("class", "activity");
        activity.innerHTML = toDo.data.activities[i].activity
        
        TODO_CONTAINER.appendChild(h2Title);
        TODO_CONTAINER.appendChild(activity);
    }
    
}



SEARCH_BUTTON.addEventListener("click", () => {
    travelAPI();

});


