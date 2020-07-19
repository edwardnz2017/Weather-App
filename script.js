const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const displayCity = document.getElementById('searched-city');
const displayTemp = document.getElementById('searched-temp');
const displayWeatherDescription = document.getElementById(
  'weather-description'
);
const displayTempMin = document.getElementById('searched-temp-min');
const displayTempMax = document.getElementById('searched-temp-max');
const weatherPic = document.getElementById('weatherPic');
const buttonCoverter = document.getElementById('converter');

searchButton.addEventListener('click', (e) => {
  e.preventDefault();
  getWeather(searchInput.value, buttonCoverter.innerText);
  searchInput.value = '';
});

buttonCoverter.addEventListener('click', (e) => {
  if (buttonCoverter.innerText === 'Metric') {
    buttonCoverter.innerText = 'Imperial';
  } else {
    buttonCoverter.innerText = 'Metric';
  }
});

const getWeather = async (city, unit) => {
  //unit is imperial or metric
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=256551530792322a5380ad7d7262f3db`,
      { mode: 'cors' }
    );
    const weatherData = await response.json();
    displayCity.innerText = capitalize(city) + ', ' + weatherData.sys.country;
    displayTemp.innerText = roundUp(weatherData.main.temp);
    weatherPic.src = weatherIcon(weatherData.weather[0].main);
    displayWeatherDescription.innerText = weatherData.weather[0].description;
    displayTempMin.innerText = roundUp(weatherData.main.temp_min);
    displayTempMax.innerText = roundUp(weatherData.main.temp_max);
  } catch (error) {
    alert('City not found');
  }
};

const weatherIcon = (weatherType) => {
  if (weatherType === 'Clear') {
    return 'http://openweathermap.org/img/wn/01d@2x.png';
  } else if (weatherType === 'Clouds') {
    return 'http://openweathermap.org/img/wn/02d@2x.png';
  } else if (weatherType === 'scattered clouds') {
    return 'http://openweathermap.org/img/wn/03d@2x.png';
  } else if (weatherType === 'broken clouds') {
    return 'http://openweathermap.org/img/wn/04d@2x.png';
  } else if (weatherType === 'Drizzle') {
    return 'http://openweathermap.org/img/wn/09d@2x.png';
  } else if (weatherType === 'Rain') {
    return 'http://openweathermap.org/img/wn/10d@2x.png';
  } else if (weatherType === 'Thunderstorm') {
    return 'http://openweathermap.org/img/wn/11d@2x.png';
  } else if (weatherType === 'Snow') {
    return 'http://openweathermap.org/img/wn/13d@2x.png';
  } else if (
    weatherType === 'Mist' ||
    weatherType === 'Fog' ||
    weatherType === 'Dust'
  ) {
    return 'http://openweathermap.org/img/wn/50d@2x.png';
  }
};

const capitalize = (s) => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const roundUp = (figure) => {
  return Math.round(figure * 10) / 10;
};
