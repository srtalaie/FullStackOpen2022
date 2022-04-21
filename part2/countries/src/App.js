import { useState, useEffect } from 'react'
import axios from 'axios'

import Country from './components/Country'
import SearchBox from './components/SearchBox'
import CountryInfo from './components/CountryInfo'

function App() {
const [countries, setCountries] = useState([])
const [newSearchTerm, setSearchTerm] = useState('')

useEffect(() => {
  axios
    .get('https://restcountries.com/v3.1/all')
    .then(res => {
      setCountries(res.data)
    })
}, [])

const regex = new RegExp(newSearchTerm, 'i')
const handleSearch = (event) => {
  setSearchTerm(event.target.value)
}

  return (
    <div className="App">
      <SearchBox value={newSearchTerm} onChange={handleSearch} />
      {countries.filter((country) => regex.test(country.name.common)).length >= 10 ? (<div>Too many matches, specify another filter</div>) : countries.filter((country) => regex.test(country.name.common)).map((country) => (
        countries.filter((country) => regex.test(country.name.common)).length === 1 ? (
          <CountryInfo 
            key={country.name.common}
            name={country.name.common}
            capital={country.capital[0]}
            area={country.area}
            languages={country.languages}
            flag={country.flags.svg}
          />
        ) : (
          <ul>
            <Country
              key={country.name.common} 
              name={country.name.common} 
            /> 
          </ul>
        )
      ))}
    </div>
  )
}

export default App
