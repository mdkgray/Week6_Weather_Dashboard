// global variables
let APIKey = 'f8e8d9393c62f382bacf3be3a3c668a5';
// variable for search button, past cities button and clear history button
let searchBttn = $('#searchButton');
let clearHistoryBttn = $('#clearHistoryButton');
// query selectors for user input fields
let cityInputEl = $('#cityInput');
// variable for current city
let currentCity;
// variable for city search history
let cityHistory = $('#cityHistory');
// event listeners for search button and clear history button
searchBttn.on('click', handleFormSubmit);

let resultsPanel = $('#resultsPanel');

// Function to handle user input into form 
function handleFormSubmit(event) {
    event.preventDefault();
    selectedCityConditions.innerHTML = '';
    fiveDayForecastText.innerHTML = '';
    fiveDayForecastTiles.innerHTML = '';
    currentCity = cityInputEl.val().trim();

    getCityCoordinates();

    return;
};

// function handleClearSearchHistory() 



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

        displaySearchHistory();

        return cityInfo;
     })
     .then(function (data) {
        getWeatherData(data);
     })
     return;    
};

function getWeatherData(data) {
    const requestURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + data.lat + '&lon=' + data.lon + '&exclude=minutely,hourly,alerts&units=metric&appid=' + APIKey;
    
    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);

            // set styling for results box
            let selectedCityConditions = $('#selectedCityConditions');
            selectedCityConditions.addClass('border rounded border-dark bg-secondary bg-gradient text-dark mt-3');

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
            let currentWeatherIcon = data.current.weather[0].icon;
            let currentWeatherIconImg = $('<img>');
            currentWeatherIconImg.attr('src', 'http://openweathermap.org/img/wn/' + currentWeatherIcon + '.png');
            searchedCityName.append(currentWeatherIconImg);
            
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

            currentUVIndexEl.text(`UV: ${currentUVIndex}`)
            if (currentUVIndex <= 3) {
                currentUVIndexEl.css({'background-color': 'green', 'color': 'white', 'width': 'auto'});
            } else if (currentUVIndex <= 6) {
                currentUVIndexEl.css({'background-color': 'yellow', 'color': 'black', 'width': 'auto'});
            } else if (currentUVIndex <= 8) {
                currentUVIndexEl.css({'background-color': 'orange', 'color': 'white', 'width': 'auto'});
            } else if (currentUVIndex <= 11) {
                currentUVIndexEl.css({'background-color': 'red', 'color': 'white', 'width': 'auto'});
            } else {
                currentUVIndexEl.css({'background-color': 'violet', 'color': 'white', 'width': 'auto'});
            }
            
            selectedCityConditions.append(currentUVIndexEl);

            //Create 5 day weather forecast
            let fiveDayForecastText = $('#fiveDayForecastText');
            let fiveDayForecastHeader = $('<h2>');
            fiveDayForecastHeader.text('5 Day Weather Forecast');
            fiveDayForecastText.append(fiveDayForecastHeader);

            let fiveDayForecastTiles = $('#fiveDayForecastTiles');

            // pull data for daily forecasts and display for 5 days
            for (let i = 1; i <= 5; i++) {
                let date;
                let icon;
                let temperature;
                let humidity;
                let windspeed;

                date = data.daily[i].dt;
                date = moment.unix(date).format('DD/MM/YYYY');
                icon = data.daily[i].weather[0].icon;
                temperature = data.daily[i].temperature;
                humidity = data.daily[i].humidity;
                windspeed = data.daily[i].wind_speed;

                //create card for daily weather forecast
                let weatherCard = $('<div>');
                weatherCard.addClass('card col-2 m-1 bg-primary text-white');
                //text for inside the card
                let cardText = $('<div>');
                cardText.addClass('card-body');
                cardText.innerHTML = `<h6>${date}</h6>
                <img src = 'http://openweathermap.org/img/wn/${icon}.png'> <br>
                ${temperature}°C <br>
                ${humidity}% <br>
                ${windspeed}km/h`

                weatherCard.append(cardText);
                fiveDayForecastTiles.append(weatherCard);
            }
        })
    return;
};

function displaySearchHistory(event) {
    let storedCities = JSON.parse(localStorage.getItem('cities')) || [];
    let citySearchHistory = $('#cityHistory');

    citySearchHistory.innerHTML = '';

    for ( i = 0; i < storedCities.length; i++) {
        let searchedCityButton = document.createElement('button');
        searchedCityButton.classList.add('btn', 'btn-primary', 'my-2', 'past-city');
        searchedCityButton.setAttribute('style', 'width: 100%');
        citySearchHistory.append(searchedCityButton);
    }
    return;
}

// function clearCurrentCity()



// displaySearchHistory();



// function to append data results into display fields
    //append 5 day forecast to page

//function for local storage 

// function to append local storage to page 

// function to clear local storage