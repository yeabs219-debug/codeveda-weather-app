import React ,{ useState }from 'react'
import Weather from './components/Weather'
import SearchAutoComplete from './utils/SearchAutoComplete'
import dayBackground from './assets/dayBackground.jpg'
import nightBackground from './assets/nightBackground.jpg'
const App = () => {
  const [isDay , setIsday] = useState(0)
  
  return (
    <div className='app' style={{
    backgroundImage: `url(${isDay === 1 ? dayBackground : nightBackground})`
    }}>
      <Weather isDay={isDay} setIsDay={setIsday}/>
    </div>
  )
}

export default App
