// import KEY from '../config'

export default function fetchWeather(city) {
    const APP_KEY = "4d8fb5b93d4af21d66a2948710284366"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APP_KEY}&units=metric`;
    return fetch(url)

}