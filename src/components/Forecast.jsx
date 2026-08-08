import React from 'react'

const Forecast = ({dailyForecastData}) => {
  console.log(dailyForecastData)
  return (
    <div className='forecast-container'>
      <h2>Forecast of upcoming days</h2>
    <div className="forecast-list">
    {
      dailyForecastData.map((day , index)=> (
        <div className="forecast-card" key={index}>
        <div className="forecast-date">
          <span className="date">{day.date}</span>
          <span className="day">{day.day}</span>
        </div>

        <img src={day.icon} alt="Clear sky" />

        <div className="details">
          <p className="temp">{day.maxTemperature}°C</p>
          <p className="condition">{day.condition}</p>
        </div>
      </div>
      ))
     }
    </div>
     
    </div>
  )
}

export default Forecast
