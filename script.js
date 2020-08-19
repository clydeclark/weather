// $("searchBtn").on("click", function () {

var temp = "Portland";
var APIkey = "1547aa72d05b54adb9e772b31cccca3c"
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + temp + "&APPID=" + APIkey + "&units=imperial"

$.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function (response) {
        console.log(queryURL);

        console.log(response);
    })
// })


// api address
// http://api.openweathermap.org/data/2.5/weather?q=Portland&appid=[API-KEY-GOES-HERE]&units=imperial"