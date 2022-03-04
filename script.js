
let weather = {

    API_KEY: "233cf4f1125c14c45a16dadd8ef4e20c",
    API_URL: 'https://api.openweathermap.org/data/2.5',

    fetchWeather: async function (city) {

        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.API_KEY}`)
            document.getElementById("error-message").innerText = ""

            if (!response.ok) {
                throw new Error(`${city} not found, ${response.statusText}`)
            }
            const data = await response.json();

            this.displayWeather(data);
        }
        catch (error) {
            console.error(error)
            document.getElementById("error-message").innerText = `City of '${city}' does not exist, please enter a valid one`
        }
    },

    displayCityWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerText = name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = Math.round(temp * 10) / 10 + " °C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?" ${name}-city')`;
    },

    fetchForecastWeather: async function (data) {
        console.log(data)
        const { lon, lat } = data.coord;
        const url = `${this.API_URL}/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${this.API_KEY}`;
        const response = await fetch(url);
        const forecastData = await response.json();
        return forecastData
    },

    displayWeather: async function (data) {
        this.displayCityWeather(data);
        const forecast = await this.fetchForecastWeather(data);
        this.renderForecastWeather(forecast)
    },

    renderForecastWeather: function (weekData) {
        const parentElem = document.querySelector(".forecast");
        parentElem.innerText = "";
        const sevenDays = weekData.daily.slice(1)
        for (let currentday of sevenDays) {
            const childElem = this.createForecastWeather(currentday)
            parentElem.appendChild(childElem)
        }
    },

    createForecastWeather: function (forecastData) {
        console.log("this is forecastData", forecastData)

        const parentElem = document.createElement('div');
        const childChildElem1 = document.createElement('p');
        let childChildElem2 = document.createElement('img');
        childChildElem2.setAttribute("src", "");

        const dateInMilliseconds = forecastData.dt * 1000;
        const date = new Date(dateInMilliseconds);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' });
        const temp = forecastData.temp.day;
        const text = document.createTextNode(`${day} ${month} `);

        childChildElem2.src = `https://openweathermap.org/img/wn/${forecastData.weather[0].icon}.png`;
        childChildElem1.appendChild(text)
        parentElem.appendChild(childChildElem1)
        parentElem.appendChild(childChildElem2)
        return parentElem;
    },


    search: function () {
        const searchBarElement = document.querySelector(".search-bar");
        this.fetchWeather(searchBarElement.value);
        searchBarElement.value = "";
    },
};


document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search();
    }
});


weather.fetchWeather("London");

module.exports = weather