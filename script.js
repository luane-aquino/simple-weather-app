import KEY from "./config.js";

var formEl = document.getElementById("searchForm");
var cityEl = document.getElementById("city");
let cardsEl = document.getElementById("cards");
let errorMsgEl = document.getElementById("error-msg");
let cardsList = [];
const temp = "lu";

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  submitForm();
  clearField();
});

function submitForm() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityEl.value}&appid=${KEY}&units=metric`;
  fetch(url)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error("not found");
      }
    })
    .then((response) => {
      if (cityAlreadyExist(response)) {
        throw new Error(
          `${response.name} ${response.sys.country} city already exist`,
        );
      }
      hideErrorMessage();
      updateCardsList(response);
      showWeatherInfo();
    })
    .catch((error) => {
      console.error("msg:", error);
      const errorText = error.toString().replace("Error: ", "");
      showErrorMessage(errorText);
    });
}

function cityAlreadyExist(city) {
  return cardsList.find(
    (item) => item.name === city.name && item.sys.country === city.sys.country,
  );
}

function showErrorMessage(text) {
  errorMsgEl.innerText = text;
  errorMsgEl.classList.add("visible");
  errorMsgEl.setAttribute("aria-hidden", "false");
}

function hideErrorMessage() {
  if (errorMsgEl.classList.contains("visible")) {
    errorMsgEl.classList.remove("visible");
    errorMsgEl.setAttribute("aria-hidden", "true");
  }
}

function updateCardsList(info) {
  let isNewItem = true;

  const newList = cardsList.map((item) => {
    if (item.name === info.name && item.sys.country === info.sys.country) {
      isNewItem = false;
      return info;
    }
    return item;
  });

  cardsList = newList;
  isNewItem && cardsList.push(info);
}

function showWeatherInfo() {
  let html = "";

  for (let i = 0; i < cardsList.length; i++) {
    const iconUrl = `https://openweathermap.org/img/wn/${cardsList[i].weather[0].icon}@2x.png`;
    const iconDesc = `https://openweathermap.org/img/wn/${cardsList[i].weather[0].description}@2x.png`;

    html += `
    <li class='card'>
      <div class='card__city-country-wrapper' aria-label='${
        cardsList[i].name
      }, ${cardsList[i].sys.country}'>
        <h3 class='card__title' aria-hidden>${cardsList[i].name}</h3>
        <span class='card__badge' aria-hidden>${cardsList[i].sys.country}</span>
      </div>
      <div class='card__temperature-wrapper' aria-label='${Math.round(
        cardsList[i].main.temp,
      )} °C'>
        <p class='temperature-wrapper__number' aria-hidden>${Math.round(
          cardsList[i].main.temp,
        )}</p>
        <span class='temperature-wrapper__symbol' aria-hidden>°C</span>
      </div>
      <img src='${iconUrl}' alt='${iconDesc}' width='80' height='80'/>
      <p class='card__weather-desc'>${cardsList[i].weather[0].description}</p>
    </li>
   `;
  }

  cardsEl.innerHTML = html;
}

function clearField() {
  cityEl.value = "";
}
