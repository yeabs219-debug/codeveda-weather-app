const toInteger = (num) => Math.floor(num)
const dateToDay = (date)=> new Date(date).toLocaleDateString('en-US' ,{
  weekday: "short"
})
export const searchCities = async(cityQuery)=>{
    try {
      const url =  `https://api.weatherapi.com/v1/search.json?key=${import.meta.env.VITE_WEATHER_API}&q=${cityQuery}`
      const response = await fetch(url);
      
      if(!response.ok){
      throw new Error('City not found please try another city or check spelling')
      return;
     }
     const data = await response.json();
     return(data);

    } catch (error) {
      console.error(error)
      throw error
    }
}

export const getCurrentWeather = async (cityName)=>{
  try {
     const url = `https://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_WEATHER_API}&q=${encodeURIComponent(cityName)}&aqi=no`
     const response = await fetch(url)

     if(!response.ok){
      throw new Error('error fetching weather data')
      return;
     }
     const data = await response.json()
     const isDay =  data.current.is_day;
     const currentData = {
        humidity: toInteger(data.current.humidity),
        windSpeed: toInteger(data.current.wind_kph),
        city: data.location.name,
        country: data.location.country,
        temperature: toInteger(data.current.temp_c),
        icon: data.current.condition.icon,
        condition: data.current.condition.text,
        feelsLike: toInteger(data.current.feelslike_c),
        uv: data.current.uv,
        chanceOfRain: data.current.chance_of_rain ?? 0,
        pressure: toInteger(data.current.pressure_mb),
      }
     return {currentData ,isDay}
  } catch (error) {
    console.error(error)
    throw error

  }
}

export const getForecast = async(cityName)=>{
  try {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API}&q=${encodeURIComponent(cityName)}&days=7&aqi=no&alerts=no`
    const response = await fetch(url)
    
    if(!response.ok){
      throw new Error('error fetching weather data')
      return;
     }
    const data = await response.json()

    const dailyForecast = formatDailyForecast(data)
    const hourlyForecast = formatHourlyForecast(data)

      return {dailyForecast ,hourlyForecast};
  } catch (error) {
    console.error(error)
    throw error
  }
}

const formatDailyForecast=(data)=>{
  console.log('daily forecast running')
  return(
    data.forecast.forecastday.map((day) => (
      { date: day.date,
        day: dateToDay(day.date),
        maxTemperature: Math.floor(day.day.maxtemp_c), 
        minTemperature: Math.floor(day.day.mintemp_c), 
        condition: day.day.condition.text, 
        icon: day.day.condition.icon,
        chanceOfRain: day.day.daily_chance_of_rain, 
      }))
    )

}
const formatHourlyForecast = (data) => {
  const currentTime =  Date.now();
    const  upcomingHours =  data.forecast.forecastday[0].hour.filter(
      (hour)=> new Date(hour.time).getTime() > currentTime
    )
    console.log(upcomingHours)

  return upcomingHours.map((hour) => ({
    date: hour.time.split(' ')[0],
    hour: hour.time.split(' ')[1],
    icon: hour.condition.icon,
    temperature: Math.floor(hour.temp_c),
    condition: hour.condition.text,
  }))
}