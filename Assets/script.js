// global variables
let APIKey = 'f8e8d9393c62f382bacf3be3a3c668a5';

// query selectors for user input fields
let cityInputEl = $('#cityInput');

// variable for search button, past cities button and clear history button
let searchBttn = $('#searchButton');
// let pastSearchedCities = $('#searchedCities');
let clearHistoryBttn = $('#clearHistoryButton');

// variable for current city display 
// let searchedCity = $('#searchedCity');

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
};

function getWeatherData(data) {
    const requestURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + data.lat + '&lon=' + data.lon + '&appid=' + APIKey;
    
    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);

            // set styling for results box
            let selectedCityConditions = $('#selectedCityConditions');
            selectedCityConditions.addClass('border border-secondary mt-3');

            // set <h2> for searched city and display
            let searchedCityName = $('<h2>');
            searchedCityName.text(currentCity);
            selectedCityConditions.append(searchedCityName);

            //set current date and append to page
            let currentDate = data.current.dt;
            currentDate = moment.unix(currentDate).format('DD/MM/YYYY');
            let currentDateDisplay = $('<span>');
            currentDateDisplay.text(` (${currentDate}) `);
            searchedCityName.append(currentDateDisplay);  

            //weather icon append to page
            // let currentWeatherIcon = data.current.weather[0].icon;
            // currentWeatherIcon = $('<img>');
            // let iconURL = ("http://openweathermap.org/img/w/" + currentWeatherIcon + ".png");
            // $(currentWeatherIcon).attr('src', iconURL);
            // searchedCityName.append(currentWeatherIcon);

            let currentWeatherIcon = data.current.weather[0].icon;
            currentWeatherIcon = $('<img>');
            currentWeatherIcon.attr('src', 'http://openweathermap.org/img/wn/' + currentWeatherIcon + '.png');
            searchedCityName.append(currentWeatherIcon);

            
            // append current temperature
            let currentTemp = data.current.temp;
            let currentTempEl = $('<p>');
            currentTempEl.text(`Temperature: ${currentTemp}°C`);
            selectedCityConditions.append(currentTempEl);

            //append current humidity
            let currentHumidity = data.current.humidity;
            let currentHumidityEl = $('<p>');
            currentHumidityEl.text(`Humidity: ${currentHumidity}%`);
            selectedCityConditions.append(currentHumidityEl);

            // append current wind 
            let currentWind = data.current.wind_speed;
            let currentWindEl = $('<p>');
            currentWindEl.text(`Wind speed: ${currentWind}km/h`);
            selectedCityConditions.append(currentWindEl);

            //append current UV index with background colour
            let currentUVIndex = data.current.uvi;
            let currentUVIndexEl = $('<p>');
            let currentUVIndexSpan = $('<span>');
            currentUVIndexEl.append(currentUVIndexSpan);

            currentUVIndexEl.text(`UV: ${currentUVIndex}`)
            if (currentUVIndex <= 3) {
                currentUVIndexSpan.css({'background-color': 'green', 'color': 'white'});
            } else if (currentUVIndex <= 6) {
                currentUVIndexSpan.css({'background-color': 'yellow', 'color': 'black'});
            } else if (currentUVIndex <= 8) {
                currentUVIndexSpan.css({'background-color': 'orange', 'color': 'white'});
            } else if (currentUVIndex <= 11) {
                currentUVIndexSpan.css({'background-color': 'red', 'color': 'white'});
            } else {
                currentUVIndexSpan.css({'background-color': 'violet', 'color': 'white'});
            }
            
            selectedCityConditions.append(currentUVIndexEl);

            //Create 5 day weather forecast



        })
    return;
};

// function for API call -- 
    //need to call the geocoding API then parse into main API = api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}

    // Main API = api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

// function to append data results into display fields
    //append 5 day forecast to page

//function for local storage 

// function to append local storage to page 

// function to clear local storage