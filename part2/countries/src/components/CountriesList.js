const CountriesList = ({ countries }) => (
  <div>
    {countries.map(({ name, tld }) => (
      <div key={tld[0]}>
        {name.common}
      </div>
    ))}
  </div>
)

export default CountriesList