import { useState, useEffect } from "react"
import axios from "axios"
import WeatherData from "./WeatherData"

const CountryData = ({ country }) => {
  const [weather, setWeather] = useState(undefined)
  
  useEffect(() => {
    const apiKey = process.env.REACT_APP_API_KEY
    const { capitalInfo } = country
    const { latlng } = capitalInfo
    const [lat, lon] = latlng
    
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
      .then(({ data }) => setWeather(data))
  }, [country])
  
  let { name, capital, area, languages, flags } = country

  const { common: commonName } = name
  const [firstCapital] = capital
  const { png: flagImg } = flags

  return (
    <div>
      <h2>{commonName}</h2>
      <div>capital {firstCapital}</div>
      <div>area {area}</div>
      <strong>languages:</strong>
      <ul>
        {
          Object.entries(languages).map(([id, language]) =>(
            <li key={id}>{language}</li>
          ))
        }
      </ul>
      <img src={flagImg} width={150} alt={`${commonName} Flag`} />
      <WeatherData capital={firstCapital} weather={weather} />
    </div>
  )
}

export default CountryData