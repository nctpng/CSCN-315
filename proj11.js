
// Open Meteo API does not require an API key
const lat = 37.4149
const lon = -79.1422
const daily_vars = 'weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_sum,wind_speed_10m_max,wind_direction_10m_dominant'
const curr_vars = 'apparent_temperature,temperature_2m,relative_humidity_2m'
const fetch_url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=${daily_vars}&timezone=auto&forecast_days=1&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch`
const xml_url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=${curr_vars}&timezone=auto&forecast_days=1&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch`

// Weather codes from Open Meteo API
const wmo_codes = new Map([
    [0, 'Clear sky'],
    [1, 'Mainly clear'],
    [2, 'Partly cloudy'],
    [3, 'Overcast'],
    [45, 'Fog'],
    [48, 'Depositing rime fog'],
    [51, 'Drizzle: Light'],
    [53, 'Drizzle: Moderate'],
    [55, 'Drizzle: Dense'],
    [56, 'Freezing Drizzle: Light'],
    [57, 'Freezing Drizzle: Dense'],
    [61, 'Rain: Slight'],
    [63, 'Rain: Moderate'],
    [65, 'Rain: Heavy'],
    [66, 'Freezing Rain: Light'],
    [67, 'Freezing Rain: Heavy'],
    [71, 'Snow fall: Slight'],
    [73, 'Snow fall: Moderate'],
    [75, 'Snow fall: Heavy'],
    [77, 'Snow grains'],
    [80, 'Rain showers: Slight'],
    [81, 'Rain showers: Moderate'],
    [82, 'Rain showers: Violent'],
    [85, 'Snow showers: Slight'],
    [86, 'Snow showers: Heavy'],
    [95, 'Thunderstorm: Slight or moderate'],
])

// Map to store weather data
// keys match the ids of the html elements and the codes from Open-Meteo API
let weather_data = new Map([
    ["weather_code", 0],
    ["temperature_2m_max", 0],
    ["temperature_2m_min", 0],
    ["apparent_temperature_max", 0],
    ["apparent_temperature_min", 0],
    ["sunrise", ""],
    ["sunset", ""],
    ["precipitation_sum", 0],
    ["wind_speed_10m_max", 0],
    ["wind_direction_10m_dominant", 0],
    ["apparent_temperature", 0],
    ["temperature_2m", 0],
    ["relative_humidity_2m", 0]
])

// Fetch daily weather data from Open Meteo API
fetch(fetch_url)
    .then(response => {
        if (!response.ok) {
            throw new Error("API call error: " + response.statusText);
        }
        return response.json();
    })
    .then(data => { // Add the daily weather data to the weather_data map
        console.log(data);
        process_daily_data(weather_data, data);
        console.log(weather_data);
        return weather_data;
    })
    .then(weather_data => { // Update the html elements with the daily weather data
        for (let [key, value] of weather_data) {
            element = document.getElementById(key);
            if (element) {
                element.innerHTML = value;
                console.log(key, value, element);
            } else {
                console.log(`Element with id ${key} not found.`);
            }
        }
    })
    .catch(error => {
        console.error("Error fetching weather data:", error);
    });

// Use XMLHttpRequest to fetch current data from Open Meteo API
const xhr = new XMLHttpRequest();
xhr.open("GET", xml_url, true);

xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            // Parse the JSON response
            const data = JSON.parse(xhr.responseText);
            console.log(data);

            // Add the current weather data to the weather_data map
            process_current_data(weather_data, data);
            console.log(weather_data);

            // Update the html elements with the current weather data
            for (let [key, value] of weather_data) {
                element = document.getElementById(key);
                if (element) {
                    element.innerHTML = value;
                    console.log(key, value, element);
                } else {
                    console.log(`Element with id ${key} not found.`);
                }
            }
        }
        else {
            console.error("Error fetching current weather data:", xhr.statusText);
        }
    }
}
xhr.send();

// Adds daily weather data to the map, processes data when necessary
function process_daily_data(weather_data, data) {
    weather_data.set("weather_code", wmo_codes.get(data.daily.weather_code[0]));
    weather_data.set("temperature_2m_max", data.daily.temperature_2m_max[0]);
    weather_data.set("temperature_2m_min", data.daily.temperature_2m_min[0]);
    weather_data.set("apparent_temperature_max", data.daily.apparent_temperature_max[0]);
    weather_data.set("apparent_temperature_min", data.daily.apparent_temperature_min[0]);
    weather_data.set("sunrise", data.daily.sunrise[0].split("T")[1].slice(0, 5));
    weather_data.set("sunset", data.daily.sunset[0].split("T")[1].slice(0, 5)   );
    weather_data.set("precipitation_sum", data.daily.precipitation_sum[0]);
    weather_data.set("wind_speed_10m_max", data.daily.wind_speed_10m_max[0]);
    weather_data.set("wind_direction_10m_dominant", data.daily.wind_direction_10m_dominant[0]);
}

// Adds current weather data to the map
function process_current_data(weather_data, data) {
    weather_data.set("apparent_temperature", data.current.apparent_temperature);
    weather_data.set("temperature_2m", data.current.temperature_2m);
    weather_data.set("relative_humidity_2m", data.current.relative_humidity_2m);
}