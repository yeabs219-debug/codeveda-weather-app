import React from 'react'

const WeatherSummary = ({city , country ,icon , condition, temperature}) => {
  return (
    <div>
      <div className="weather-summary-left">
      <p className="location">{city}</p>
      <p className="country">{country}</p>
      <img src={icon} alt={condition} className="weather-icon"/>
      <p className="temprature">{temperature}°C</p>
      <p className="condition">{condition}</p>
      </div>
    </div>
  )
}

export default WeatherSummary
