import KEY from './config.js'

var formEl = document.getElementById('searchForm')
var cityEl = document.getElementById('city')
let cardsEl = document.getElementById('cards')
let errorMsgEl = document.getElementById('error-msg')
let cardsList = []

formEl.addEventListener('submit', (event) => {
  event.preventDefault()
  submitForm()
  clearField()
})

function submitForm() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityEl.value}&appid=${KEY}&units=metric`;
  fetch(url)
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error('not found');
    }
  })
  .then((response) => {
    hideErrorMessage()
    updateCardsList(response)
    showWeatherInfo()
  })
  .catch((error) => {
    console.error('msg:',error);
    showErrorMessage()
  });
}

function showErrorMessage() {
  errorMsgEl.classList.remove('invisible')
  errorMsgEl.setAttribute('aria-hidden', 'false')
}

function hideErrorMessage() {
  if(!errorMsgEl.classList.contains('invisible')) {
    errorMsgEl.classList.add('invisible')
    errorMsgEl.setAttribute('aria-hidden', 'true')
  }
}


function updateCardsList(info) {
  let isNewItem = true

  const newList = cardsList.map((item) => {
    if(item.name === info.name && item.sys.country === info.sys.country) {
      isNewItem = false
      return info
    }
    return item
  })

  cardsList = newList
  isNewItem && cardsList.push(info)
}

function showWeatherInfo() {
  let html = ''

  for(let i = 0; i < cardsList.length; i++) {
    const iconUrl = `https://openweathermap.org/img/wn/${cardsList[i].weather[0].icon}@2x.png`
    const iconDesc = `https://openweathermap.org/img/wn/${cardsList[i].weather[0].description}@2x.png`
    
    html += `
    <h3>${cardsList[i].name}</h3>
    <span>${cardsList[i].sys.country}</span>
    <p>${cardsList[i].main.temp}°C</p>
    <img src='${iconUrl}' alt='${iconDesc}'/>
    <p>${cardsList[i].weather[0].description}</p>
   `
  }

  cardsEl.innerHTML = html
}

function clearField() {
  cityEl.value = ''
}