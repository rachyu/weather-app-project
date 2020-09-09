//display the current date and time using JavaScript: Tuesday 16:00
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
let months = now.getMonth() + 1;
if (months < 10) {
  months = `0${months}`;
}
let date = now.getDate();
if (date < 10) {
  date = `0${date}`;}
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let currentDateTime = document.querySelector("#current-datetime");
currentDateTime.innerHTML = `${day} ${date}/${months} at ${hours}:${minutes}`;


function showTemp(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML = `${Math.round(
    response.data.main.temp)}°C`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#currentHigh").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#currentLow").innerHTML = Math.round(
    response.data.main.temp_min
  );
  let emojiElement= document.querySelector("#emoji");
  emojiElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  emojiElement.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "501c9abeab1dab5979d0718d7d83a51d";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  search(city);
}

function searchCurrentLocation(position) {
  let apiKey = "501c9abeab1dab5979d0718d7d83a51d";
  let units = "metric";
  let apiCoordsUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiCoordsUrl).then(showTemp);
}

function runCoords(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}
let searchCity = document.querySelector("#search-city-form");
searchCity.addEventListener("submit", handleSubmit);

let currentLocation = document.querySelector("#location");
currentLocation.addEventListener("click", runCoords);

search("London");

//function unitChangeTemp(event) {
//  event.preventDefault();
//  let fahTemp = document.querySelector("#current-temp");
//  fahTemp.innerHTML = Math.round((fahTemp.value * 9) / 5 + 32);
//}

//let changeUnit = document.querySelector("#change-unit");
//changeUnit.addEventListener("click", unitChangeTemp);

//function changeToCelFunction(event) {
// event.preventDefault();
// search(city);
//}

//let changeToCel = document.querySelector("#change-unit-hidden");
//changeToCel.addEventListener("click", search);
