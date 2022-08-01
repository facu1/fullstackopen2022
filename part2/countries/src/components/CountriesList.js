import CountriesListItem from "./CountriesListItem"

const CountriesList = ({ countries, handleClick }) => (
  <div>
    {countries.map(({ name, tld }) => {
      const { common: commonName } = name
      const [key] = tld

      return (
        <CountriesListItem key={key} name={commonName} handleClick={handleClick} />
      )
    })}
  </div>
)

export default CountriesList