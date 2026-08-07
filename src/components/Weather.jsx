import React, { useEffect, useState } from 'react'
import './weather.css'
import SearchAutoComplete from '../utils/SearchAutoComplete'
import WeatherSummary from './WeatherSummary'
import WeatherDetails from './WeatherDetails'
import Forecast from './Forecast'
import { getCurrentWeather , getForecast, searchCities} from '../services/weatherService'
import Spinner from './Spinner'

const Weather = () => {
  const [forecastData ,setForecastData] = useState(null)
  const [weatherData, setWeatherData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const search = async (query = 'Addis Ababa') => {
    const cityName = query.trim() || 'Addis Ababa'
    setWeatherData(null)
    setIsLoading(true)
    setError(null)
    try {
      
      const currentData = await getCurrentWeather(cityName);
      const forecast = await getForecast(cityName);

       setWeatherData(currentData)
       setForecastData(forecast)

    } catch (fetchError) {
      setWeatherData(null)
      setError('Unable to load weather data. Please try another city.')
      console.error(fetchError)
    } finally {
      setIsLoading(false)
    }
  }

   useEffect(() => {
    search('Addis Ababa')
   }, [])

  return (
    <div className="weather-container">
      <div className="weather-search-row">
        <SearchAutoComplete search={search} />
      </div>

      <div className="weather-content">
        {isLoading?( <Spinner/>):
        error ? ( <p className="weather-status weather-error">{error}</p>) :
        weatherData && (
          <div className="weather-grid">
            <WeatherSummary
              city={weatherData.city}
              country={weatherData.country}
              icon={weatherData.icon}
              temperature={weatherData.temperature}
              condition={weatherData.condition}
            />
            <WeatherDetails
              humidity={weatherData.humidity}
              windSpeed={weatherData.windSpeed}
              uv={weatherData.uv}
              chanceOfRain={weatherData.chanceOfRain}
              pressure={weatherData.pressure}
              feelsLike={weatherData.feelsLike}
            />
          </div>
        )}
      </div>
      {
      error ? (<p className="weather-status weather-error">{error}</p>) :
        forecastData && (
                <Forecast forecastData={forecastData}/>
        )
      }
    </div>
  )
}

export default Weather;
