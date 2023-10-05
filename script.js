import KEY from './config.js'

var formEl = document.getElementById('searchForm')
var cityEl = document.getElementById('city')
let cardsEl = document.getElementById('cards')
let cardsList = []

formEl.addEventListener('submit', (event) => {
  console.log('***[1] key',KEY);
  event.preventDefault()
  submitForm()
  clearField()
})

cityEl.addEventListener('keyup', (event) => {
  console.log('***[2]',);
  if(event.key === 'Enter') {
    console.log('***[3]',);
    submitForm()
    clearField()
  }
})

function submitForm() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityEl.value}&appid=${KEY}&units=metric`;
  fetch(url)
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error("Something went wrong on API server!");
    }
  })
  .then((response) => {
    console.log(response);
    cardsList.push(response)
    showWeatherInfo()
  })
  .catch((error) => {
    console.error(error);
  });
}

function showWeatherInfo() {
  let html = ''

  for(let i = 0; i < cardsList.length; i++) {
    html += `
    <h3>${cardsList[i].name}</h3>
    <span>${cardsList[i].sys.country}</span>
    <p>${cardsList[i].main.temp}°C</p>
    <i>icon</i>
    <p>${cardsList[i].weather[0].description}</p>
   `
  }

  cardsEl.innerHTML = html
}

function clearField() {
  cityEl.value = ''
}