import Weather from "./Weather"

const CountryInfo = ({ country }) => {
  return (
    <div>
        <h3>{country.name.common}</h3>
        <p>Capital: {country.capital[0]}</p>
        <p>Area: {country.area}</p>
        <h4>Languages:</h4>
        <ul>
            {Object.keys(country.languages).map((language) => (
               <li>{country.languages[language]}</li> 
            ))}
        </ul>
        <img src={country.flags.svg} alt={`${country.name.common}-flag`} />
        <Weather country={country}/>
    </div>
  )
}

export default CountryInfo