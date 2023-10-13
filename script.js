import fetchWeather from './api/weather.js';

let searchFormElement = document.getElementById("searchForm");
let cityElement = document.getElementById("city");
let cardsElement = document.getElementById("cards");
let errorMessageElement = document.getElementById("error-msg");
let cardsList = [];

const RESPONSE_STATUS_TEXT = {
  "404": "please search for a valid city",
  "500": "an internal error occurred. Try again!"
}

searchFormElement.addEventListener("submit", (event) => {
  event.preventDefault();
  submitForm();
  clearInputValue();
});

function clearInputValue() {
  cityElement.value = "";
}

function getErrorMessage(statusCode) {
  return RESPONSE_STATUS_TEXT[statusCode] || ""
}

async function submitForm() {
  const data = await fetchWeather(cityElement.value)
  const response = await data.json()
  const statusCode = response.cod
  if (statusCode >= 400) {
    const errorMessage = getErrorMessage(statusCode)
    showErrorMessage(errorMessage)
    return
  }
  hideErrorMessage();
  updateCardsList(response);
}

function showErrorMessage(text) {
  errorMessageElement.innerText = text;
  errorMessageElement.classList.add("visible");
  errorMessageElement.setAttribute("aria-hidden", "false");
}

function hideErrorMessage() {
  if (errorMessageElement.classList.contains("visible")) {
    errorMessageElement.classList.remove("visible");
    errorMessageElement.setAttribute("aria-hidden", "true");
  }
}

function cityAlreadyExists(weatherData) {
  return cardsList.some(cardItem => cardItem.name === weatherData.name && cardItem.sys.country === weatherData.sys.country)
}

function updateCardsList(weatherData) {
  if (!cityAlreadyExists(weatherData)) {
    cardsList.push(weatherData);
    renderWeatherInfo(weatherData)
  }
}

function renderWeatherInfo(response) {
  let html = cardsElement.innerHTML;
  const iconUrl = `https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`;
  const iconAlt = `https://openweathermap.org/img/wn/${response.weather[0].description}@2x.png`;
  html += `
    <li class='card'>
      <div class='card__city-country-wrapper' aria-label='${response.name
    }, ${response.sys.country}'>
        <h3 class='card__title' aria-hidden>${response.name}</h3>
        <span class='card__badge' aria-hidden>${response.sys.country}</span>
      </div>
      <div class='card__temperature-wrapper' aria-label='${Math.round(
      response.main.temp,
    )} °C'>
        <p class='temperature-wrapper__number' aria-hidden>${Math.round(
      response.main.temp,
    )}</p>
        <span class='temperature-wrapper__symbol' aria-hidden>°C</span>
      </div>
      <img src='${iconUrl}' alt='${iconAlt}' width='80' height='80'/>
      <p class='card__weather-desc'>${response.weather[0].description}</p>
    </li>
   `;
  cardsElement.innerHTML = html;
}
