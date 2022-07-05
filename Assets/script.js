// global variables
var APIKey = '94f3fb3dbc8fcc33a80f69c4935cdade';

// variable for current date with day/js
var currentDate = dayjs('').format('DD/MM/YYYY')

// query selectors for user input fields
var city = document.getElementById('#cityInput');

// variable for search button and clear history button
var searchButton = $('#searchButton');
var clearHistoryButton = $('#clearHistoryButton');

// variable for city spotlight display 
var chosenCity = $('#chosenCity');

//variable for 5 day forecast 
var fiveDayForecast = $('#forecast');

// event listeners for search button and clear history button
searchButton.on('click', function () {
    alert('Hello World');
});


// function for API call 

// function to append data results into display fields

// functions for uv index colours 

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