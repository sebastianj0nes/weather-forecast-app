$(document).ready(function(){
// Initialise javascript variables
var textInput;
var submitButton = $("#search-button");
var todaySec = $("#today");
var historyDiv = $("#history");
var forecastSec = $("#forecast");


// Initialise API
var APIKey = "29f595125610436376375721ee1541b8";

// On page load 
// Create header element for 'previous search'
var historyHeader = $("<h3>");
historyHeader.text("Previous search");
historyDiv.append(historyHeader);


submitButton.on("click",function(event){
    event.preventDefault();

    // Set variable to user input
    textInput = $("#search-input").val();

    
    // Set local storage to store latest text input
    localStorage.setItem("city",textInput);

    // Call functions to display and store weather data
    todayWeather();
    addLocationToLS();
    forecastWeather();
})


// Func to get data from OpenWeather
var todayWeather = function (){

    // Ajax call to retrieve co-ordinates from using API
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q="+ textInput+ "&appid=" + APIKey;
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        console.log(response);

        // Initialise variables to store relevant weather info
        var todayTemp = response.list[0].main.temp - 273.15;
        var todayWind = response.list[0].wind.speed;
        var todayHumid = response.list[0].main.humidity;
        var todayTime = moment().format("D/M/YY");

        // Display weather icon as part of header
        var weatherIcon = $("<img>");

        // Create variable to hold icon id
        var todayIconID = response.list[0].weather[0].icon;
        // Set img source to weather icon
        weatherIcon.attr("src","http://openweathermap.org/img/w/" + todayIconID + ".png");
        weatherIcon.attr("style","background-color: grey;");

        // Add border to today sec
        todaySec.attr("style","border: 2px black solid;");
        todaySec.addClass("todaySec");
        // Create header element to hold information about time/place 
        var todayHeader = $("<h1>");
        todayHeader.text("Current forecast in " + textInput+" @ " + todayTime);
        todaySec.append(todayHeader);

        // Create p elements for temp/humidity/wind speed
            // Temp
        var tempP = $("<p>");
        tempP.text("Temperature: " + todayTemp.toFixed(2) + " °C");
        todaySec.append(tempP);
        todaySec.append(weatherIcon);


            // Humidity
        var humidP = $("<p>");
        humidP.text("Humidity: " + todayHumid + " %");
        todaySec.append(humidP);

            // Wind speed
        var speedP = $("<p>");
        speedP.text("Wind speed: " + todayWind + " KPH");
        todaySec.append(speedP);
      });
    }

// Function to add previous searches to local storage
var addLocationToLS = function () {

    // Get the user input from local storage
    var prevCity = localStorage.getItem("city");
    
    // Create button to add to history
    var prevButton = $("<button>");
    prevButton.text(prevCity);
    historyDiv.append(prevButton);

    // On click of history button load that weather data
    prevButton.on("click",function(){

        todaySec.empty();
        textInput = prevCity;
        // Call forecast function
        todayWeather();
    })
    
}

// Call location func to load previous search at all times
addLocationToLS();



var forecastWeather = function (){

    // Get weather data
        // Date / Icon / Temp / Humidity
    var forecastHeader = $("<h3>");
    forecastHeader.text("5-day Forecast: ");
    forecastHeader.attr("style","width: 100%;");
    forecastSec.append(forecastHeader);

    // Set inner content to nothing (if already loaded weather)
    forecastSec.innerHTML = "";

    // Initiate card deck to hold 5 day forecast cards
    var cardDeck = $("<div class ='card-deck'>");

    // AJAX call to get data from API
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q="+ textInput+ "&appid=" + APIKey;
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        console.log(response);

        // Initiate counter 
        var dayCount = 0;

    forecastSec.append(cardDeck);
    // For loop for 5 days
    for (var i = 0; i < 5; i++){

        
        
        // Create card element
        var dayCard = $("<div class=card>");
        // Append card to forecast section
        cardDeck.append(dayCard);

        // DATE
        var date = response.list[dayCount].dt_txt;
        var formattedDate = moment(date).format("D/M/YYYY");
        dayCard.append(formattedDate);

        // ICON
        var icon = response.list[dayCount].weather[0].icon;
        var weatherIcon = $("<img>");
        // Set img source to weather icon
        weatherIcon.attr("src","http://openweathermap.org/img/w/" + icon + ".png");
        weatherIcon.attr("style","background-color: grey;");
        dayCard.append(weatherIcon);

        // TEMPERATURE
        var forecastTemp = response.list[dayCount].main.temp - 273.15;
        var tempP = $("<p>");
        tempP.text("Temperature: " + forecastTemp.toFixed(2) + "°C");
        dayCard.append(tempP);

        // HUMIDITY
        var forecastHumidity = response.list[dayCount].main.humidity;
        var humidityP = $("<p>");
        humidityP.text("Humidity: " + forecastHumidity + " %");
        dayCard.append(humidityP);


       // Using 3 hour intervals - every 8 intervals is a day
       dayCount = dayCount + 8;
    }

});
};





});
