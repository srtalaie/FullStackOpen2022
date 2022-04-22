import {useState, useEffect} from 'react'

import axios from 'axios'

const Weather = ({ country }) => {
    const [weather, setWeather] = useState({})
    const [weatherInfo, setWeatherInfo] = useState({})

    useEffect(() => {
        const getWeather = async () => {
            let data = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`).then(res => {
                return res.data
            })
            setWeather(data)
        }
        getWeather()
    }, [country])

    useEffect(() => {
        const getWeatherInfo = async () => {
            let data = await weather
            setWeatherInfo(data.weather[0])
        }
        getWeatherInfo()
    }, [weather])

  return (
    <div>
        <h4>Weather in {country.capital[0]}</h4>
        <p>Temp: {weather.main?.temp}&deg;C</p>
        <img src={`http://openweathermap.org/img/wn/${weatherInfo?.icon}@2x.png`} alt={weatherInfo?.main} />
        <p>Wind: {weather.wind?.speed}</p>
    </div>
  )
}

export default Weather