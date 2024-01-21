const APIKey = "14899decffe0ccf6cbb995782f2d053d";
const searchInput =document.getElementById('searchInput');
// const currentDay = new date();
const searchBtn = document.getElementById('Search');
const container = document.getElementById('weatherContainer');
const Dashboard = document.getElementById('Dashboard');
let city = document.getElementById('searchInput');

const GetCityInfo = async (url) => {
  Dashboard.textContent=""
    const response1 = await fetch(url);
    const data1 = await response1.json();
    console.log(data1);
    const placeName = document.createElement('div');
    placeName.innerHTML = data1.name;
    Dashboard.appendChild(placeName);
    const img=document.createElement("img")
    img.src=`https://openweathermap.org/img/wn/${data1.weather[0].icon}@2x.png`
  placeName.appendChild(img)
    const temp = document.createElement('div');
    temp.textContent = "temp: "+ data1.main.temp+"°F";
    Dashboard.appendChild(temp);
  
    const humidity = document.createElement('div');
    humidity.textContent ="humidity: "+ data1.main.humidity+"%";
    Dashboard.appendChild(humidity);
  
    const windSpeed = document.createElement('div');
    windSpeed.textContent = "windspeed: "+ data1.wind.speed+"mph";
    Dashboard.appendChild(windSpeed);
    await GetWeatherInfo(data1.name);
}
const getWeatherForecast = async function (url) {
    await GetCityInfo (url);
}

//Function to get weather for the cities 
const GetWeatherInfo = async (cityName) => {

//container to store the city searched temp, humidity and wind speed for the next 5 days
container.innerHTML += `<div class='icons'>
<p class='weather' id='day1'></p>
<p class='date' id='day1Date'>${dayjs.unix(data2.list[i].dt).format('MM/DD/YYYY')}</p>

<p class='temp' id='day1Temp'>Temp: ${data2.list[i].main.temp} °F</p>
<p class='humidity' id='humidity'>Humidity: ${data2.list[i].main.humidity}%</p>
<p class='windSpeed' id='windSpeed'>Wind Speed: ${data2.list[i].wind.speed} MPH</p>
</div>`






    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIKey}&units=imperial`;
    const response2 = await fetch (url);
    var data=response2.json()
    container.textContent = ""
    console.log (data)
    for (let i = 2; i<data.list.length; i = i+8){

    }

    
}


  searchBtn.addEventListener('click', () => {
    let city = searchInput.value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=imperial`;
    getWeatherForecast(url);
  });
  const saveCitySearch = () => {
    let citySearches = JSON.parse(localStorage.getItem('citySearches')) || [];
    citySearches.push(city);
    localStorage.setItem('citySearches', JSON.stringify(citySearches));
  }
  //Function created to render the buttons for the searched cities
  const searchedCityButtons = (cityNames) => {
    const cityButtonsContainer = document.getElementById('cityButtonsContainer');
    cityButtonsContainer.innerHTML = '';
    cityNames.forEach((cityName) => {
      const button = document.createElement('button');
      button.textContent = cityName;
      button.classList.add('city-button');
      button.addEventListener('click', () => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}&units=imperial`;
        getWeatherForecast(url);
      });
      cityButtonsContainer.appendChild(button);
    });
    searchedCityButtons(citySearches);
  };
  const citySearches = JSON.parse(localStorage.getItem('citySearches')) || [];
  const button = document.getElementById('button-container');
  for (let i = 0; i < citySearches.length; i++) {
    const button = document.createElement('button');
    button.textContent = cities[i];
    button.classList.add('city-button');
    GetWeatherInfo(cities[i]);
    container.appendChild(button);
  };
  
  console.log('Getting weather information for city:', city);
  // button.addEventListener('click', function () {
  //   console.log('What city was searched:', cities[i]);
  // });
  

