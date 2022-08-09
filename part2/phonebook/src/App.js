import { useState, useEffect } from "react";
import personService from "./services/persons"
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons)
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
    personService
      .create(personObject)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
      .catch(() => {
        alert('Error adding new contact')
      })
  }

  const removePerson = (id) => {
    personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(() => {
        const person = persons.find(person => person.id === id)
        alert(`${person.name} was already deleted from server`)
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
      <Persons persons={personsToShow} handleRemove={removePerson} />
    </div>
  );
}

export default App;
