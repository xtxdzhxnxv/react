import { useState, useEffect,} from 'react'
import './App.css'

function App() {
  
  const [city, setCity] = useState(null);
  const [search, setSearch] = useState("New York");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchApi = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=bfb992e0216e173b11f02b9fe263f29a`;
      const response = await fetch(url);
      if(!response.ok){
        setCity(null);
        setWeather(null);
        console.error("Error fetching data:", response.statusText);
        return;
      } 
      const resJson = await response.json();
      if(resJson.main){
        setCity(resJson.main);
        setWeather(resJson.weather[0]);
        console.log('API Response:', resJson); // Покажет всю структуру данных в консоли
      }
      else{
        setCity(null);
        setWeather(null);
        console.error("No main data in response");
      }
    }
    fetchApi();

  }, [search]);

  // маппинг классов для разных типов погоды
  const weatherClassMap = {
    Clear: 'weather-clear',
    Clouds: 'weather-clouds',
    Rain: 'weather-rain',
    Snow: 'weather-snow',
    Thunderstorm: 'weather-thunder',
    Mist: 'weather-mist',
    Default: 'weather-default'
  };
  const getWeatherClass = (main) => weatherClassMap[main] || weatherClassMap.Default;





  const popularCities = ['New York', 'London', 'Tokyo', 'Paris', 'Sydney', 'Moscow', 'Shanghai'];

  const getCityName = (main) => {
    if (popularCities.includes(main)) {
      if (main === 'New York') return 'New-York';
      return main;
    }
    return 'Unknown City';
  }




  return (
    <>
      <div className={`app ${getWeatherClass(weather?.main)} ${getCityName(search)}`}>
      <h1>Searching city's weather with API</h1>
      <input type="text" placeholder='Enter city name' onChange={(e) => {setSearch(e.target.value.trim())}} />
      

      {/* присваиваем класс по погоде контейнеру */}
      <div className= 'weatherInfo' >
        <h2>City Name: {search} </h2>
        <h3>Temperature: {city ? (city.temp -273.15).toFixed(2) + '°C' : 'N/A'} </h3>
        <h3>Weather: {weather ? weather.description : 'N/A'} </h3>
        <p>write the city name in English right</p>
      </div>
      </div>
    </>
  ) 
}

export default App

