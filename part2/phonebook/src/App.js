import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    const url = 'http://localhost:3001/persons'
    axios
      .get(url)
      .then(({ data }) => {
        setPersons(data)
      })
  }, [])

  const addPerson = (e) => {
    e.preventDefault()
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    const personObject = {
      name: newName,
      number: newNumber
    }
    const url = 'http://localhost:3001/persons'

    axios
      .post(url, personObject)
      .then(({ data: person }) => {
        setPersons(persons.concat(person))
        setNewName('')
        setNewNumber('')
      })
      .catch((error) => {
        alert('Error adding new contact')
      })
  }

  const handleChangeName = (e) => {
    setNewName(e.target.value)
  }

  const handleChangeNumber = (e) => {
    setNewNumber(e.target.value)
  }

  const handleChangeFilter = (e) => {
    setFilter(e.target.value)
  }

  const personsToShow = filter
    ? persons.filter(person => person.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} handleChange={handleChangeFilter} />
      <h3>add a new</h3>
      <PersonForm handleSubmit={addPerson} nameValue={newName} handleChangeName={handleChangeName} numberValue={newNumber} handleChangeNumber={handleChangeNumber} />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} />
    </div>
  );
}

export default App;
