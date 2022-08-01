const WeatherData = ({ capital, weather }) => {
  if (!weather) {
    return (
      <div>
        <h3>Weather in {capital}</h3>
      </div>
    )
  }

  const { main, weather: weatherInfo, wind } = weather
  const { temp } = main
  const { icon } = weatherInfo[0]
  const { speed } = wind

  return (
    <div>
      <h3>Weather in {capital}</h3>
      <div>temperature {temp} Celcius</div>
      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={`${capital} weather icon`}
      />
      <div>wind {speed} m/s</div>
    </div>
  )
}

export default WeatherData