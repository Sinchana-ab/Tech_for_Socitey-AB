
//working on weather updates
const searchBtn = document.querySelector('.searchBtn');
const cityNameInput = document.querySelector('.citySearch');
const apiKey = '4be02127fcee082c870e117e3190277f';
const weeks = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
const WeatherDegree = document.querySelector('.weatherInput');
const locationData = document.querySelector('.location-data');
const weatherPallete = document.querySelector('.weather-pallete');
const weatherUL = document.querySelector('.weather-ul');
const currentLocationBtn = document.querySelector('.current-location-btn');

const gettingStartedBtn = document.querySelector('.getting-started-btn');

gettingStartedBtn.addEventListener('click',function(){
     document.querySelector('.frontpage').classList.add('active');
     document.querySelector('.weather-container').classList.add('active');
})

//creating a function named gettingWeatherDetails
function gettingWeatherDetails(cityWeather, lat, lon)
{
    const weather_api_url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    fetch(weather_api_url).then(res=>res.json()).then(data=>{

        const forecastDays = [];
        const sixDaysForecast = data.list.filter(function(forecast){
        const forecastdate = new Date(forecast.dt_txt).getDate();
        if(!forecastDays.includes(forecastdate))
        {
            return forecastDays.push(forecastdate);
        }
        });
        console.log(data);
        //when weather is fetched the HTML elements is removed and new will be added

        cityNameInput.value = "";
        WeatherDegree.innerHTML = "";
        locationData.innerHTML ="";
        weatherPallete.innerHTML ="";
        weatherUL.innerHTML = "";

        sixDaysForecast.forEach(function(weatherItem,index){

            if(index === 0)
            {
                WeatherDegree.insertAdjacentHTML('beforeend',createWeatherCard(cityWeather, weatherItem, index));
            }
            else
            {
                weatherUL.insertAdjacentHTML('beforeend',createWeatherCard(cityWeather, weatherItem, index));
            }
        });


    }).catch(() =>{
        alert('Error Occured While Fetching the Coordinates of Weather');
    });
}

//working on search Button 
searchBtn.addEventListener('click',function(){
    const cityName = cityNameInput.value.trim();//trim to remove extra spaces
    if(cityName == "")
        {
            alert("Please Enter the City Name");
            return;
        }
    else
    {
        const geocoding_api_url = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`;
        fetch(geocoding_api_url).then(res =>res.json()).then(data=>{
            if(!data.length) //if you enter wrong keyword or city name
            {
                return alert(`${cityName} isn't a valid city Name`);
            }
            else
            {
                const { name,lat,lon } = data[0]; //storing the value of Name,latitute and value of longitude in data array
                gettingWeatherDetails(name, lat, lon);//Now We have to create a function named gettingWeatherDetails
            }
                
            
            // console.log(data);

        }).catch(()=>{
            alert("Error Occured While Fetching the Coordinates");
        })
    }
})
currentLocationBtn.addEventListener('click', function() {
    navigator.geolocation.getCurrentPosition(function(position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const geocoding_api_url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`;
      fetch(geocoding_api_url).then(res => res.json()).then(data => {
        if (!data.length) {
          return alert(`${cityName} isn't a valid city Name`);
        } else {
          const { name, lat, lon } = data[0];
          gettingWeatherDetails(name, lat, lon);
        }
      }).catch(() => {
        alert("Error Occured While Fetching the Coordinates");
      });
    });
  });
// JavaScript for controlling audio
const audio = document.getElementById('backgroundAudio');

// Example: Stop audio when user clicks a button
document.getElementById('stopAudioButton').addEventListener('click', function() {
  audio.pause();
});
