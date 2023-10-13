import { APP_KEY } from '../config'

export default function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APP_KEY}&units=metric`;
    return fetch(url)
}