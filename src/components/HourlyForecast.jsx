import React from 'react'

const HourlyForecast = ({HourlyForecastData}) => {
  console.log(HourlyForecastData)
  return (
    <div className='forecast-container'>
      <h2>Forecast of upcoming hours</h2>
    <div className="forecast-list">
    {
      HourlyForecastData.map((time , index)=> (
        <div className="forecast-card" key={index}>
        <div className="forecast-date">
          <span className="date">{time.date}</span>
          <span className="day">{time.hour}</span>
        </div>

        <img src={time.icon} alt="Clear sky" />

        <div className="details">
          <p className="temp">{time.temperature}°C</p>
          <p className="condition">{time.condition}</p>
        </div>
      </div>
      ))
     }
    </div>
     
    </div>
  )
}

export default HourlyForecast
