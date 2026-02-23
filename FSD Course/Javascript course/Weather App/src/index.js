import "./index.css";

const apiKey = process.env.WEATHER_API_KEY;

async function getWeather(location, unit) {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/today?key=${apiKey}&unitGroup=${unit}&lang=eng&include=days`;

  const response = await fetch(url);
  const data = await response.json();
  return processWeatherData(data);
}

function processWeatherData(data) {
  const day = data.days[0];
  return {
    city: data.resolvedAddress,
    temp: day.temp,
    feelslike: day.feelslike,
    description: day.description,
    humidity: day.humidity,
    windspeed: day.windspeed,
    precip: day.precip,
    sunrise: day.sunrise,
    sunset: day.sunset,
  };
}

const form = document.getElementById("form");
const city = document.getElementById("city");
const unit = document.getElementById("unit");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const cityName = city.value;
  const unitChoose = unit.value;
  let unitType = "";

  if (unitChoose === "world") {
    unitType = "metric";
  } else if (unitChoose === "us") {
    unitType = "us";
  }

  const weatherData = await getWeather(cityName, unitType);
  console.log(weatherData);

  document.getElementById("data").innerHTML = `
    <p>City: ${weatherData.city}</p>
    <p>Temperature: ${weatherData.temp} ${unitChoose === "world" ? "°C" : "°F"}</p>
    <p>Feels like: ${weatherData.feelslike} ${unitChoose === "world" ? "°C" : "°F"}</p>
    <p>Description: ${weatherData.description}</p>
    <p>Humidity: ${weatherData.humidity} %</p>
    <p>Wind speed: ${weatherData.windspeed} ${unitChoose === "world" ? "km/h" : "mile/h"}</p>
    <p>Precipitation: ${weatherData.precip} ${unitChoose === "world" ? "mm" : "inches"}</p>
    <p>Sunrise: ${weatherData.sunrise}</p>
    <p>Sunset: ${weatherData.sunset}</p>
`;
});
