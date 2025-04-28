
let city_file = "city_lat_lon.json"

// Read the lat and lon data from the local json file into a map
let cities = new Array();

fetch(city_file)
.then(response => {
    if (!response.ok) {
        throw new Error("Network response was not ok: " + response.statusText);
    }
    return response.json();
})
.then(data => {
    data.forEach(item => {
        cities.push(item.city_name);
    });
})
.catch(error => {
    console.error("Error fetching city data:", error);
});

// Fade in the weather section on button press
$(function() {
    $("#getWeatherBtn").on("click", function() {
        // Call the function to get weather data from Open Meteo API
        let city = $("#cityInput").val();
        if (city) {
            get_lat_lon(city);
        }
        else {
            alert("Please enter a city name.");
        }
        // Hide the suggestions and fade in the weather section
        $("#suggestions").slideUp();
        $(".weather").hide();
        $(".weather").fadeIn(1000);
    });
});

// Predictive search
$("#cityInput").on("input", function() {
    const inputVal = $(this).val().toLowerCase();
    $("#suggestions").empty();

    if (inputVal.length > 0) {
        //const filteredFruits = fruits.filter(fruit => fruit.toLowerCase().includes(inputVal));
        const filteredCities = cities.filter(city => city.toLowerCase().includes(inputVal));

        if (filteredCities.length > 0) {
            filteredCities.forEach(city => {
                $("#suggestions").append(`<div class='suggestion-item'>${city}</div>`);
            });
            $("#suggestions").slideDown();
        } else {
            $("#suggestions").slideUp();
        }
    } else {
        $("#suggestions").slideUp();
    }
});

// Click on suggestion to fill input
$(document).on("click", ".suggestion-item", function() {
    $("#search").val($(this).text());
    $("#suggestions").slideUp();
});