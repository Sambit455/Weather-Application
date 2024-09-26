const apiKey = '6d9844e00f5db43a7e56b38ae69cbab3';
const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");
const weatherInfo = document.getElementById("weather-info");


// Fetch the Weather-Data
async function getWeather(city){
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  try{
    const res = await fetch(url,{
      method : 'GET',
    });
    if(!res.ok){
      throw new Error("city not found");
    }
    const data = await res.json();
    console.log(data);
    displayWeather(data);
  }
  catch(error){
    displayError(error.message);
  }
}

// Display the Weather-Data
function displayWeather(data){
  const{name,main,weather} = data;
  const temperature = main.temp;
  const description = weather[0].description;
  const icon = weather[0].icon;

  weatherInfo.innerHTML=` <h2>${name}</h2>
                          <p><img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather icon"></p>
                          <p>Temperature: ${temperature}</p>
                          <p>Condition: ${description}</p> `;
}

// Display the Weather Error Message
function displayError(message){
  weatherInfo.innerHTML=` <p id="error-message">${message}</p>
  `;
}

// Add Event Listener to a Search-Button
searchBtn.addEventListener('click',() => {
  const city = cityInput.value.trim();
  if(city){
    getWeather(city);
  }else{
    displayError("Please Enter Your City Name");
  }
});










