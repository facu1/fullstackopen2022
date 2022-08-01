const CountriesListItem = ({ name, handleClick }) => (
  <div>
    {name} <button onClick={() => handleClick(name)}>show</button>
  </div>
)

export default CountriesListItem