const APIKey = "14899decffe0ccf6cbb995782f2d053d";
const searchInput =document.getElementById('searchInput');
//const currentDay = new date();
const searchBtn = document.getElementById('Search');
const container = document.getElementById('weatherContainer');
const Dashboard = document.getElementById('Dashboard');
let city = document.getElementById('searchInput');
const fiveDayCard = document.getElementById('Five-Day-Card')
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

    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIKey}&units=imperial`;
    const response2 = await fetch (url);
    var data1= await response2.json()
    // container.textContent = ""
    console.log (data1)
    fiveDayCard.textContent=""
    for (let i = 2; i < data1.list.length; i = i + 8) {
      fiveDayCard.innerHTML += `
          <div class="col-sm-2 mb-3 mb-sm-0">
              <div class="card">
                  <div class="card-body">
                      <h5 class="card-title">
                          <img src = 'https://openweathermap.org/img/wn/${data1.list[i].weather[0].icon}@2x.png' alt="">
                      </h5>
                      '${dayjs.unix(data1.list[i].dt).format("MM/DD/YY")}'
                      
                          <li class="list-group-item my-1">Temperature: ${data1.list[i].main.temp}°</li>
                          <li class="list-group-item my-1">Wind: ${data1.list[i].wind.speed}</li>
                          <li class="list-group-item my-1">Humidity: ${data1.list[i].main.humidity}</li>
                      
                  </div>
              </div>
          </div> 
  `}
 }
 let citySearches = JSON.parse(localStorage.getItem('citySearches')) || [];


  searchBtn.addEventListener('click', () => {
    let city = searchInput.value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=imperial`;
    getWeatherForecast(url);
    saveCitySearch(city)
  });
  const saveCitySearch = (city) => {
    citySearches.push(city);
    console.log (citySearches)
    localStorage.setItem('citySearches', JSON.stringify(citySearches));
  }
  //Function created to render the buttons for the searched cities
  const searchedCityButtons = (e) => {
    let cityName = e.target.textContent;
    
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}&units=imperial`;
  getWeatherForecast(url);
     
    };
    
 for (let i = 0; i < citySearches.length; i++) {
    let button = document.createElement('button');
    button.textContent = citySearches[i];
    button.classList.add('city-button');
    button.onclick = searchedCityButtons;
    
    container.appendChild(button);
    
  };
  
  console.log('Getting weather information for city:', city);

  