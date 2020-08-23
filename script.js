$(document).ready(function () {

    var cities = [];
    var date;
    var storedVal = localStorage.getItem("cities");
    var APIkey = "1547aa72d05b54adb9e772b31cccca3c"
    var location;
    var lat;
    var lon;


    if (storedVal) {
        cities = storedVal.split(",");
    }
    // loop through cities and do button append
    for (var i = 0; i < cities.length; i++) {
        $(".history").append(`<div><button class="location">${cities[i]}</button></div>`);
    }

    // search function
    $(".searchBtn").on("click", function () {
        event.preventDefault();
        location = $("#searchInput").val();
        if ($("#searchInput").val !== null) {
            $(".history").append(`<div><button class="location">${location}</button></div>`);
        }
        oneDayCall(location);
        if (!cities.includes(location)) {
            cities.push(location);
            localStorage.setItem("cities", cities);
        }

    })


    // connect to the APIs
    function oneDayCall(location) {
        var oneDayURL = "http://api.openweathermap.org/data/2.5/weather?q=" + location + "&APPID=" + APIkey + "&units=imperial";

        $.ajax({
                url: oneDayURL,
                method: "GET"
            })
            .then(function (response) {
                lat = response.coord.lat;
                lon = response.coord.lon;
                date = moment.unix(response.dt).format('dddd, MMMM Do YYYY');
                popWeather(response);
                uvCall();
                fiveDayCall();
            })
    }

    function uvCall() {
        var uvURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIkey + "&lat=" + lat + "&lon=" + lon;


        $.ajax({
                url: uvURL,
                method: "GET"
            })
            .then(function (response) {
                popUV(response);

            })
    }

    function fiveDayCall() {
        var fiveDayURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + APIkey + "&units=imperial";


        $.ajax({
                url: fiveDayURL,
                method: "GET"
            })
            .then(function (response) {
                // console.log(response);
                popFive(response);
            })
    }

    // populate from location buttons
    $(document).on("click", ".location", function () {
        event.stopImmediatePropagation();
        event.preventDefault();
        location = $(event.target).text();
        oneDayCall(location, date);
    })

    // populate weather stats
    function popWeather(response) {
        // console.log(date);
        $("#location").html(`${response.name} - ${date}`);
        $("#curTemp").html(response.main.temp);
        $("#humidity").html(response.main.humidity);
        $("#wind").html(response.wind.speed);

    }

    function popUV(response) {
        $("#uv").html(response.value)
    }

    function popFive(response) {
        // for (var i = 0; i < 5; i++) {
        //     var div = $("<div>").text(i);

        // }
    }

});
// api address
// http://api.openweathermap.org/data/2.5/weather?q=Portland&appid=[API-KEY-GOES-HERE]&units=imperial"
// UV url: "http://api.openweathermap.org/data/2.5/uvi?appid=7ba67ac190f85fdba2e2dc6b9d32e93c&lat=" + lat + "&lon=" + lon,
// 5 day url: api.openweathermap.org/data/2.5/forecast?q={city name}&appid={your api key}