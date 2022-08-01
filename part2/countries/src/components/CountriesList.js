import CountriesListItem from "./CountriesListItem"

const CountriesList = ({ countries, handleClick }) => (
  <div>
    {countries.map(({ name, tld }) => (
      <CountriesListItem key={tld[0]} name={name.common} handleClick={handleClick} />
    ))}
  </div>
)

export default CountriesList