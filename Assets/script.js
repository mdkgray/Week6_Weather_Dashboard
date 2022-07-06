// global variables
let APIKey = 'f8e8d9393c62f382bacf3be3a3c668a5';

// variable for current date with day/js
let currentDate = dayjs('').format('DD/MM/YYYY')

// query selectors for user input fields
let cityInputEl = $('#cityInput');

// variable for search button, past cities button and clear history button
let searchBttn = $('#searchButton');
let pastSearchedCities = $('#searchedCities');
let clearHistoryBttn = $('#clearHistoryButton');

// variable for current city display 
let searchedCity = $('#searchedCity');

//variable for 5 day forecast 
let fiveDayForecast = $('#forecast');

let currentCity;

// event listeners for search button and clear history button
searchBttn.on('click', handleFormSubmit);


// Function to handle user input into form 
function handleFormSubmit(event) {
    event.preventDefault();
    currentCity = cityInputEl.val().trim();

    // clearCurrentWeather();
    getCityCoordinates();

    return;
};

// function to get coordinates of city searched 
function getCityCoordinates() {
    let requestURL = "http://api.openweathermap.org/data/2.5/weather?q=" + currentCity + "&appid=" + APIKey;
    let storedCities = JSON.parse(localStorage.getItem('cities')) || [];

    fetch(requestURL)
    .then(function (response) {
        if (response.status >= 200 && response.status < 300) {
            return response.json();
          } else {
            throw Error(response.statusText);
          }  
     })
     .then(function (data) {
        console.log(data);

        const cityInfo = {
            city: currentCity,
            lon: data.coord.lon,
            lat: data.coord.lat,
        }

        storedCities.push(cityInfo);
        localStorage.setItem('cities', JSON.stringify(storedCities));

        // displaySearchHistory();

        return cityInfo;
     })
     .then(function (data) {
        getWeatherData(data);
     })
     return;    
}

function getWeatherData(data) {
    let requestURL = 'https://api.openweathermap.org/data/2.5/weather?lat=' + {lat} + '&lon=' + {lon} + '&appid=' + APIKey;

    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
        })




};

// function for API call -- 
    //need to call the geocoding API then parse into main API = api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}

    // Main API = api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

// function to append data results into display fields

//function for local storage 

// function to append local storage to page 

// function to clear local storage


// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city