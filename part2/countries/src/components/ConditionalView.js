import CountriesList from "./CountriesList"
import CountryData from "./CountryData"

const ConditionalView = ({ countries, handleClick }) => {
  const { length } = countries
  const countriesLength = length

  if (countriesLength > 10) {
    return <div>Too many matches, specify another filter</div>
  } else if (countriesLength > 1) {
    return <CountriesList countries={countries} handleClick={handleClick} />
  } else if (countriesLength === 1) {
    const [ firstCountry ] = countries

    return <CountryData country={firstCountry} />
  } else {
    return <div>No matches found</div>
  }
}

export default ConditionalView