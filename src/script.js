//display the current date and time using JavaScript: Tuesday 16:00
function formatDate(date){
  
}

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
let months = now.getMonth()+1;
 if (months < 10) {
   months = `0${months}`; }
let date = now.getDate();  
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`; }
let minutes = now.getMinutes();
 if (minutes < 10) {
  minutes = `0${minutes}`; }
 


let currentDateTime = document.querySelector("#current-datetime");
currentDateTime.innerHTML = (`${day} ${date}/${months} at ${hours}:${minutes}`);

  
//function showTemp(response) {
//  let temp = Math.round(response.data.main.temp);
//  let currentLocation = document.querySelector("#location");
//  currentLocation.addEventListener("click",(showTemp));
//}
  

function showPosition(position) {
   let units = "metric"; 
   let apiKey = "501c9abeab1dab5979d0718d7d83a51d";
   let latitude = position.coords.latitude;
   let longitude = position.coords.longitude;
   let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
 
   axios.get(apiUrl).then(showTemp);}
 
   function showCity(city) {
    let units = "metric"; 
    let apiKey = "501c9abeab1dab5979d0718d7d83a51d";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  
    axios.get(apiUrl).then(showTemp);}
    function unitChangeTemp(event){
      event.preventDefault();
     let currentTemp= document.querySelector("h2");
      let changeUnit= document.querySelector("#change-unit");
     currentTemp.innerHTML = `temperature`;
    }
      
    let changeUnit= document.querySelector("#change-unit");
    changeUnit.addEventListener("click", unitChangeTemp);
    
    function changeToCelFunction(event){
      event.preventDefault();
     let currentTemp= document.querySelector("h2");
      let changeUnit= document.querySelector("#change-unit");
      currentTemp.innerHTML = `Math.round((temp * 9) / 5 + 32);°C`;
      
    }
    
    let changeToCel =document.querySelector("#change-unit-hidden");
    changeToCel.addEventListener("click", changeToCelFunction); 
    

function showCurrentPosition(){
  navigator.geolocation.getCurrentPosition(showPosition);}

 let currentLocation = document.querySelector("#location");
 currentLocation.addEventListener("click", showCurrentPosition);

 function search(event) {
 event.preventDefault();
let searchNewCity = document.querySelector("#search-city");
let h1 = document.querySelector("h1");
  let searchedCity = searchNewCity.value;
  h1.innerHTML = searchedCity;
  showCity(form.value);
}
let searchCity = document.querySelector("#search-city-form");
searchCity.addEventListener("submit", search);










