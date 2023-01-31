// Initialise javascript variables
var textInput;
var submitButton = $("#search-button");
var todaySec = $("#today");
var historyDiv = $("#history");



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
    todayForecast();
    addLocationToLS();
})


// Func to get data from OpenWeather
var todayForecast = function (){

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

        // Add border to today sec
        todaySec.attr("style","border: 2px black solid;");

        // Create header element to hold information about time/place 
        var todayHeader = $("<h1>");
        todayHeader.text("Current forecast in " + textInput+" @ " + todayTime);
        todaySec.append(todayHeader);

        // Create p elements for temp/humidity/wind speed
            // Temp
        var tempP = $("<p>");
        tempP.text("Temperature: " + todayTemp.toFixed(2) + " °C");
        todaySec.append(tempP);

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
        todayForecast();
    })
    
}

// Call location func to load previous search at all times
addLocationToLS();