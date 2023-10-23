export default function fetchWeather(city) {
  // in a real application this key need to be in a .env file
  const KEY = "bd60ee3a03cda093bd7daefd75613eb1";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${KEY}&units=metric`;
  return fetch(url);
}
