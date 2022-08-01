const CountryData = ({ country }) => {
  let { name, capital, area, languages, flags } = country

  return (
    <div>
      <h2>{name.common}</h2>
      <div>capital {capital[0]}</div>
      <div>area {area}</div>
      <strong>languages:</strong>
      <ul>
        {
          Object.entries(languages).map(([id, language]) =>(
            <li key={id}>{language}</li>
          ))
        }
      </ul>
      <img src={flags.png} width={150} alt={`${name.common} Flag`}></img>
    </div>
  )
}

export default CountryData