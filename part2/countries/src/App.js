import { useState, useEffect } from 'react'
import axios from 'axios'

import Country from './components/Country'
import SearchBox from './components/SearchBox'
import CountryInfo from './components/CountryInfo'

function App() {
const [countries, setCountries] = useState([])
const [newSearchTerm, setSearchTerm] = useState('')
const [selectedCountry, setSelectedCountry] = useState({})

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

const handleOpenCountryInfo = (event) => {
  setSelectedCountry(countries.find((country) => country.name.common === event.target.value))
}

  return (
    <div className="App">
      <SearchBox value={newSearchTerm} onChange={handleSearch} />
      {countries.filter((country) => regex.test(country.name.common)).length >= 10 ? (<div>Too many matches, specify another filter</div>) : countries.filter((country) => regex.test(country.name.common)).map((country) => (
        <div>
          <ul>
            <Country
              key={country.name.common} 
              name={country.name.common}
              value={country.name.common}
              onClick={handleOpenCountryInfo}
            /> 
          </ul>
        </div>
      ))}
      {Object.keys(selectedCountry).length > 0 ? (
        <CountryInfo 
          key={selectedCountry.name.common}
          name={selectedCountry.name.common}
          capital={selectedCountry.capital[0]}
          area={selectedCountry.area}
          languages={selectedCountry.languages}
          flag={selectedCountry.flags.svg}
        />
      ) : <></>}
    </div>
  )
}

export default App
