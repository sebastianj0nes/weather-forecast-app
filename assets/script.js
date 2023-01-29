// Initialise javascript variables
var textInput;
var submitButton = $("#search-button");

// Initialise API
var APIKey = "29f595125610436376375721ee1541b8";

submitButton.on("click",function(event){
    event.preventDefault();

    textInput = $("#search-input").val();

    console.log(textInput);

    getData();
})

// Build URL to search database
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + textInput + "&appid=" + APIKey;


// Func to get data from OpenWeather
var getData = function (){

    // Ajax call to retrieve data using API
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
      console.log(response);


});
}