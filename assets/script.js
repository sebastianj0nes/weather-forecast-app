// Initialise javascript variables
var textInput;
var submitButton = $("#search-button");
var todaySec = $("#today");

// Initialise API
var APIKey = "29f595125610436376375721ee1541b8";

submitButton.on("click",function(event){
    event.preventDefault();

    textInput = $("#search-input").val();

    console.log(textInput);

    todayForecast();
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

        // Initialise variables to store relevant info
        var todayTemp = response.list[0].main.temp;
        var todayWind = response.list[0].wind.speed;
        var todayHumid = response.list[0].main.humidity;
        var todayTime = moment().format("D/M/YY");


        var todayHeader = $("<h1>");
        todayHeader.text("Current forecast in " + textInput+" @ " + todayTime);
        console.log(todayHeader);
        todaySec.append(todayHeader);


        console.log("Temp: " + todayTemp);
        console.log("Wind: " + todayWind);
        console.log("Humidity: " + todayHumid + " %");







      });
    }
