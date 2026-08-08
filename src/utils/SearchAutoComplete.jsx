import React, { useState ,useEffect } from 'react'
import searchIcon from '../assets/search.png'
import { searchCities } from '../services/weatherService'
import { useDebounce } from 'react-use'
const SearchAutoComplete = ({search ,setError}) => {
  const [query ,setQuery  ]= useState("")
  const [debouncedQuery ,setDebouncedQuery] =useState("")
  const [suggestions ,setSuggestions] = useState([])
  const [showSuggestions , setShowSuggestions] = useState(false)

  useDebounce(()=> setDebouncedQuery(query) , 300 ,[query])
  const handleChange = (e)=>{
    setShowSuggestions(true);
    setQuery(e.target.value)
  }
  useEffect(()=>{
    const fetchSuggestions = async()=>{
         if(!debouncedQuery.trim()){
           setSuggestions([])
           return;
          }
       try {
      const data = await searchCities(debouncedQuery);

      setSuggestions(data);
      setError("");
    } catch (error) {
      setSuggestions([]);
      setError(error.message);
    }
    }

   fetchSuggestions()
   } , [debouncedQuery])

  return (
    <div className="search-bar">
            <input value={query} type="text" placeholder='search'  onChange={handleChange} />
            <button onClick={()=>search(query)}><img src= {searchIcon} alt="" /></button>
            {showSuggestions && suggestions.length >0 && (
              <div className="suggestions">
               {suggestions.map((city)=>(
               <div key={city.id} className='suggestion-item' onClick={()=>{search(city.name);setQuery(city.name);setSuggestions([]);setShowSuggestions(false)}}>
                <div><p>{city.name}, <span>{city.country}</span></p></div>
               </div>
              ))}
            </div>
            )}
    </div>
  )
}

export default SearchAutoComplete
