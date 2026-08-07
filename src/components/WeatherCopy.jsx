import React, { useEffect, useState } from 'react'
import './weather.css'
import clearIcon from '../assets/clear.png'
import cloudIcon from '../assets/cloud.png'
import drizzleIcon from '../assets/drizzle.png'
import humidityIcon from '../assets/humidity.png'
import rainIcon from '../assets/rain.png'
import snowIcon from '../assets/snow.png'
import windIcon from '../assets/wind.png'
import SearchAutoComplete from '../utils/SearchAutoComplete'

function toInteger (num){
    return Math.floor(num)
    }
const Weather = () => {
  const [weatherData , setWeatherData] = useState(false);
  const search = async(cityName)=>{
    if(cityName === ""){
      cityName = "Addis Ababa"
    }
    try {
      const url =`http://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_WEATHER_API}&q=${cityName}&aqi=no`

        const response = await fetch(url)
        const data = await response.json();
        console.log(data)
        setWeatherData({
          humidity:toInteger(data.current.humidity),
          windSpeed: toInteger(data.current.wind_kph),
          city:data.location.name,
          country: data.location.country,
          temprature: toInteger(data.current.temp_c),
          icon: data.current.condition.icon
        })
    }catch(error){
        setWeatherData(false)
        console.error("error in fetching data")
    }
  }

  useEffect(()=>{
    search('addis ababa')
  },[])
  return (
    <div className='weather'>
        <SearchAutoComplete search={search}/>
      {weatherData?<>
      <img src={weatherData.icon} alt="" className='weather-icon'/>
      <p className='temprature'>{weatherData.temprature}°C</p>
      <p className='location'>{weatherData.city}</p>
      <p className='country'>{weatherData.country}</p>

      <div className="weather-data">
        <div className="col">
          <img src={humidityIcon} alt="" />
          <div>
            <p>{weatherData.humidity}%</p>
            <span>humidity</span>
          </div>
        </div>
        <div className="col">
          <img src={windIcon} alt="" />
          <div>
            <p>{weatherData.windSpeed} Km/Hr</p>
            <span>wind Speed</span>
          </div>
        </div>
      </div>
      </>:<></>}
      
    </div>
  )
}
export default Weather;
