
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

function formatDate (timestamp){
  let foreDate= new Date (timestamp);
  let days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
  ];
  let day = days[foreDate.getDay()];
  let months = foreDate.getMonth() + 1;
  if (months < 10) {
  months = `0${months}`;
  }
  let date = foreDate.getDate();
  if (date < 10) {
  date = `0${date}`;}
   return `${day} ${date}/${months}`
}
function showForecast(response) {
  console.log(response);
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;
 
  for (let index = 1; index <7 ; index ++){
    forecast = response.data.daily[index];
    forecastElement.innerHTML+= `
  <div class="col nd">
  <div class="card border-info rounded-circle" style="max-width: 10rem;">
      <div class="card-body text-info" >
      <strong class="card-title"> <strong> ${formatDate(forecast.dt*1000)}</strong>
  <p class="card-text"> <img src = "http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" 
  width="35"
  />
  <br/> <i class="fas fa-long-arrow-alt-up"></i> ${Math.round(forecast.temp.max)}°
  <br/> <i class="fas fa-long-arrow-alt-down"></i> ${Math.round(forecast.temp.min)}° </p>
</div>
</div>
</div>`;
  }}


function showTemp(response) {
  console.log(response);
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
  celsiusTemp= response.data.main.temp;
  let emojiElement= document.querySelector("#emoji");
  emojiElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  emojiElement.setAttribute("alt", response.data.weather[0].description);

  let apiKey = "501c9abeab1dab5979d0718d7d83a51d";
  let units = "metric";
  let apiUrlFor=`https://api.openweathermap.org/data/2.5/onecall?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}&exclude=current,minutely,hourly&appid=${apiKey}&units=${units}`
  axios.get(apiUrlFor).then(showForecast);
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
let fahLink=document.querySelector("#cel-to-fah");
let celLink= document.querySelector("#fah-to-cel");


function unitCelToFah(event) {
event.preventDefault();
let fahTemp = document.querySelector("#current-temp");
fahTemp.innerHTML= `${Math.round((celsiusTemp * 9) / 5 + 32)}°F`;
fahLink.classList.add("selected");
celLink.classList.remove("selected");
}

function unitFahToCel(event) {
  event.preventDefault();
  let CelTemp = document.querySelector("#current-temp");
  CelTemp.innerHTML= `${Math.round(celsiusTemp)}°C`;
  fahLink.classList.remove("selected");
  celLink.classList.add("selected");
   
  }

let changeCelToFah = fahLink;
changeCelToFah.addEventListener("click", unitCelToFah);

let changeFahToCel = celLink;
changeFahToCel.addEventListener("click", unitFahToCel);

let celsiusTemp = null;