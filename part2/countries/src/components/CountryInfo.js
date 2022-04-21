const CountryInfo = ({ name, capital, area, languages, flag }) => {
  return (
    <div>
        <h3>{name}</h3>
        <p>Capital: {capital}</p>
        <p>Area: {area}</p>
        <h4>Languages:</h4>
        <ul>
            {Object.keys(languages).map((language) => (
               <li>{languages[language]}</li> 
            ))}
        </ul>
        <img src={flag} alt={`${name}-flag`} />
    </div>
  )
}

export default CountryInfo