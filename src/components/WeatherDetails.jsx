import React from 'react'
import humidityIcon from '../assets/humidity.png'
import windIcon from '../assets/wind.png'

const WeatherDetails = ({ humidity, windSpeed, feelsLike, uv, chanceOfRain, pressure }) => {
  return (
    <div className="weather-data-grid">
    <div className="detail-item">
      <img src={humidityIcon} alt="" />
      <div><p>{humidity}%</p><span>Humidity</span></div>
    </div>
    <div className="detail-item">
      <img src={windIcon} alt="" />
      <div><p>{windSpeed} km/h</p><span>Wind</span></div>
    </div>
    <div className="detail-item">
      <div><p>{feelsLike}°C</p><span>Feels like</span></div>
    </div>
    <div className="detail-item">
      <div><p>{uv}</p><span>UV Index</span></div>
    </div>
    <div className="detail-item">
      <div><p>{chanceOfRain}%</p><span>Chance of rain</span></div>
    </div>
    <div className="detail-item">
      <div><p>{pressure} mb</p><span>Pressure</span></div>
    </div>
  </div>
  )
}

export default WeatherDetails
