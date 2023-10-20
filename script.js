import fetchWeather from "./api/weather.js";

let searchFormElement = document.getElementById("searchForm");
let cityElement = document.getElementById("city");
let cardsElement = document.getElementById("cards");
let errorMessageElement = document.getElementById("error-msg");
let cardsList = [];

const RESPONSE_STATUS_TEXT = {
  400: "please search for a valid city",
  404: "please search for a valid city",
  500: "an internal error occurred. Try again!",
};

searchFormElement.addEventListener("submit", (event) => {
  event.preventDefault();
  submitForm();
  clearInputValue();
});

function clearInputValue() {
  cityElement.value = "";
}

function getErrorMessage(statusCode) {
  return RESPONSE_STATUS_TEXT[statusCode] || "";
}

async function submitForm() {
  const data = await fetchWeather(cityElement.value);
  const response = await data.json();
  const statusCode = response.cod;
  if (statusCode >= 400) {
    const errorMessage = getErrorMessage(statusCode);
    showErrorMessage(errorMessage);
    return;
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

function updateCardsList(weatherData) {
  const cityAlreadyExistIndex = cardsList.findIndex(
    (item) =>
      item.name === weatherData.name &&
      item.sys.country === weatherData.sys.country,
  );

  if (cityAlreadyExistIndex !== -1) {
    cardsList.splice(cityAlreadyExistIndex, 1, weatherData);
  } else {
    cardsList.push(weatherData);
  }

  renderInfo();
}

function renderInfo() {
  let html = "";
  for (const card of cardsList) {
    const iconUrl = `https://openweathermap.org/img/wn/${card.weather[0].icon}@2x.png`;
    const iconAlt = `https://openweathermap.org/img/wn/${card.weather[0].description}@2x.png`;
    html += `
    <li class='card'>
      <div class='card__city-country-wrapper' aria-label='${card.name}, ${
        card.sys.country
      }'>
        <h3 class='card__title' aria-hidden>${card.name}</h3>
        <span class='card__badge' aria-hidden>${card.sys.country}</span>
      </div>
      <div class='card__temperature-wrapper' aria-label='${Math.round(
        card.main.temp,
      )} °C'>
        <p class='temperature-wrapper__number' aria-hidden>${Math.round(
          card.main.temp,
        )}</p>
        <span class='temperature-wrapper__symbol' aria-hidden>°C</span>
      </div>
      <img src='${iconUrl}' alt='${iconAlt}' width='80' height='80'/>
      <p class='card__weather-desc'>${card.weather[0].description}</p>
    </li>
   `;
  }
  cardsElement.innerHTML = html;
}
