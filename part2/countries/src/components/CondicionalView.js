import CountriesList from "./CountriesList"
import CountryData from "./CountryData"

const CondicionalView = ({ countries }) => {
  const countriesLength = countries.length

  if (countriesLength > 10) {
    return <div>Too many matches, specify another filter</div>
  } else if (countriesLength > 1) {
    return <CountriesList countries={countries} />
  } else if (countriesLength === 1) {
    return <CountryData country={countries[0]} />
  } else {
    return <div>No matches found</div>
  }
}

export default CondicionalView