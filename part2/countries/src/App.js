import { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter'
import CondicionalView from './components/CondicionalView';

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(({ data }) => setCountries(data))
  } , [])

  const handleChange = (e) => {
    setFilter(e.target.value)
  }

  const handleClick = (name) => {
    setFilter(name)
  }

  const countriesToShow = filter
    ? countries
        .filter(({ name }) =>
          name.common.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))
    : countries

  return (
    <div>
      <Filter value={filter} handleChange={handleChange} />
      <CondicionalView countries={countriesToShow} handleClick={handleClick} />
    </div>
  );
}

export default App;
