import clearsky from "./assets/clearsky.jpeg";
import cloudy from "./assets/cloudy.jpg";
import rainy from "./assets/rainy.jpeg";
import sunny from "./assets/sunny.jpeg";
import windicon from "./assets/windicon.jpeg";
import humidityicon from "./assets/humidity.jpeg";
import defaulticon from "./assets/default.jpeg";
import snowy from "./assets/snowy.jpeg";
import searchicon from "./assets/search.jpeg";
import {useState} from 'react';
const WeatherDetails=({icon,temp,city,country,lat,log,humidity,wind})=>{
 return(
  <>
    <div className="image">
      <img src={icon} alt='weatherimage'/>
    </div>
    <div className='temp'>{temp}C</div>
    <div className='location'>{city}</div>
    <div className='country'>{country}</div>
    <div className='coord'>
       <div>
          <span className='lat'>latitude</span>
          <span>{lat}</span>
       </div>
       <div>
          <span className='log'>longitude</span>
          <span>{log}</span>
       </div>
    </div>
    <div className='data-container'>
      <div className='element'>
        <img src={humidityicon} alt="humidity" className='icon'/>
        <div className='data'> 
          <div className='humidity-percent'>{humidity}%</div>
          <div className='text'>Humidity</div>
        </div>
      </div>
      <div className='element'>
        <img src={windicon} alt="wind" className='icon'/>
        <div className='data'> 
          <div className='wind-percent'>{wind}kmph</div>
          <div className='text'>Wind speed</div>
        </div>
      </div>
    </div>
  </>
 );
}
function App() {
  const [name,setName]=useState('');
  const [icon,setIcon]=useState(defaulticon);
  const [temp,setTemp]=useState(0);
  const [city,setCity]=useState("CITY");
  const [country,setCountry]=useState("COUNTRY");
  const [lat,setLat]=useState(0);
  const [log,setLog]=useState(0);
  const [wind,setWind]=useState(0);
  const [humidity,setHumidity]=useState(0);
  const [cityNotFound,setCityNotFound]=useState(false);
  const [loading,setLoading]=useState(false);
  const weatherIconMap={
    "01d":clearsky,
    "01n":clearsky,
    "02d":cloudy,
    "02n":cloudy,
    "03d":sunny,
    "03n":sunny,
    "04d":sunny,
    "04n":sunny,
    "09d":rainy,
    "09n":rainy,
    "10d":rainy,
    "10n":rainy,
    "13d":snowy,
    "13n":snowy
  }
  const search = async ()=>{
    setLoading(true);
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=e6ca7531a942787a7475ca78c7f18860&units=Metric`;
    try{
      let res=await fetch(url);
      let data=await res.json();
      if(data.cod==="404"){
        console.log("City not found");
        setCityNotFound(true);
        setLoading(false);
        return;
      }
      else{
        setTemp(Math.floor(data.main.temp));
        setHumidity(data.main.humidity);
        setWind(data.wind.speed);
        setLat(data.coord.lat);
        setLog(data.coord.lon);
        setCity(data.name);
        setCountry(data.sys.country);
        const weatherIconCode=data.weather[0].icon;
        setIcon(weatherIconMap[weatherIconCode] || clearsky);
        setCityNotFound(false);
        console.log(weatherIconCode);
      }
    }catch(error){
       console.log("An error occurred ",error.message)
    }finally{
      setLoading(false);
    }
  }
  const handleChange =(event)=>{
    setName(event.target.value);
  }
  const handleKeyDown =(event)=>{
    if(event.key==="Enter"){
      search();
    }
  }
  return (
    <div className="container">
      <div className="input-container">
        <input type='text' 
        value={name}
        placeholder="Search"
        className="cityInput"
        onChange={handleChange}
        onKeyDown={handleKeyDown}/>
        <div className="search-icon" onClick={()=> search()}>
          <img src={searchicon} alt='search element'/>
        </div>
      </div>
      <WeatherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} log={log} humidity={humidity} wind={wind}/>
      <p className="copyright">
         Designed by <span>@Rishi Madhavan</span>
      </p>
    </div>
  );
}

export default App;
