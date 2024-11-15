const apiKey = 'e01cce10c5363c6c04eb5ab488910214';
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;

const searchBox = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const weatherIcon = document.getElementById("weather-icon");

async function checkWeather(city = "Paris") {
    if (!city) return;

    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (!response.ok) {
        document.querySelector(".error").style.display = "flex";
        document.getElementById("city-name").innerHTML = "----";
        document.getElementById("temp-value").innerHTML = "---";
        document.getElementById("humidity").innerHTML = "--%";
        document.getElementById("wind-speed").innerHTML = "---- km/h";
        weatherIcon.innerHTML = "--";
        document.getElementById("weather-details").innerHTML = "----, ----";
        return;
    }

    const data = await response.json();

    document.querySelector(".error").style.display = "none";
    document.getElementById("city-name").innerHTML = data.name;
    document.getElementById("temp-value").innerHTML = Math.round(data.main.temp);
    document.getElementById("humidity").innerHTML = data.main.humidity + "%";
    document.getElementById("wind-speed").innerHTML = data.wind.speed + " km/h";

    const weatherMain = data.weather[0].main;
    switch (weatherMain) {
        case "Clouds":
            weatherIcon.innerHTML = "☁️";
            break;
        case "Clear":
            weatherIcon.innerHTML = "☀️";
            break;
        case "Rain":
            weatherIcon.innerHTML = "🌧️";
            break;
        case "Drizzle":
            weatherIcon.innerHTML = "🌦️";
            break;
        case "Mist":
            weatherIcon.innerHTML = "🌫️";
            break;
        default:
            weatherIcon.innerHTML = "❓";
            break;
    }

    const utcTimestamp = data.dt * 1000;
    const timezoneOffset = data.timezone * 1000;
    const localCityTime = new Date(utcTimestamp + timezoneOffset);

    let hours = localCityTime.getUTCHours();
    const minutes = localCityTime.getUTCMinutes().toString().padStart(2, '0');

    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;

    const formattedDate = `${localCityTime.toLocaleDateString('en-US', { weekday: 'long' })} ${hours}:${minutes} ${ampm}`;

    const weatherDescription = data.weather[0].description;
    document.getElementById("weather-details").innerHTML = `${formattedDate}, <span>${weatherDescription}</span>`;

}

searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city) {
        checkWeather(city);
    }
});

searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        const city = searchBox.value.trim();
        if (city) {
            checkWeather(city);
        }
    }
});

checkWeather();


/* BY HE WHO MUST NEVER BE NAMED! */









/* const apiKey = 'e01cce10c5363c6c04eb5ab488910214';
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;

const searchBox = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const weatherIcon = document.getElementById("weather-icon");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    var data = await response.json();

    if (response.status == 404) {
        document.querySelector(".error").style.display = "flex";
        document.getElementById("city-name").innerHTML = "----";
        document.getElementById("temp-value").innerHTML = "----";
        document.getElementById("humidity").innerHTML = "-----" + "%";
        document.getElementById("wind-speed").innerHTML = "-----" + "km/h";
        weatherIcon.innerHTML = ""
    } else {
        document.querySelector(".error").style.display = "none";

        document.getElementById("city-name").innerHTML = data.name;
        document.getElementById("temp-value").innerHTML = Math.round(data.main.temp);
        document.getElementById("humidity").innerHTML = data.main.humidity + "%";
        document.getElementById("wind-speed").innerHTML = data.wind.speed + "km/h";
        document.getElementById("weather-details span").innerHTML = data.wind.speed;

        if (data.weather[0].main == "Clouds") {
            weatherIcon.innerHTML = "☁️"
        }
        else if (data.weather[0].main == "Clear") {
            weatherIcon.innerHTML = "☀️"
        }
        else if (data.weather[0].main == "Rain") {
            weatherIcon.innerHTML = "🌧️"
        }
        else if (data.weather[0].main == "Drizzle") {
            weatherIcon.innerHTML = "🌦️"
        }
        else if (data.weather[0].main == "Mist") {
            weatherIcon.innerHTML = "❄️"
        }
    }

}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
})


checkWeather(); */
