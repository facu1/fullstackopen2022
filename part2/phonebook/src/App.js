import { useState, useEffect } from "react";
import personService from "./services/persons"
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState({msg: '', isSuccessful: true})

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
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const oldPerson = persons.find((person) => person.name === newName)

        const personObject = { ...oldPerson, number: newNumber }

        personService
          .update(oldPerson.id, personObject)
          .then((returnedPerson) => {
            setPersons(persons.map((person) => person.id !== oldPerson.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
            setNotification({msg: `Number of ${oldPerson.name} updated`, isSuccessful: true})
            setTimeout(() => {
              setNotification('')
            }, 5000)
          })
          .catch(() => {
            setNotification({msg: `Information of ${oldPerson.name} has already been removed from server`, isSuccessful: false})
            setTimeout(() => {
              setNotification('')
            }, 5000);
          })
      }
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
        setNotification({msg: `Added ${returnedPerson.name}`, isSuccessful: true})
        setTimeout(() => {
          setNotification('')
        }, 5000);
      })
      .catch(() => {
        setNotification({msg: 'Error adding new contact', isSuccessful: false})
        setTimeout(() => {
          setNotification('')
        }, 5000);
        alert()
      })
  }

  const removePerson = (id) => {
    personService
      .remove(id)
      .then(() => {
        const person = persons.find(person => person.id === id)
        setNotification({msg: `Removed ${person.name}`, isSuccessful: true})
        setTimeout(() => {
          setNotification('')
        }, 5000);
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(() => {
        const person = persons.find(person => person.id === id)
        setNotification({msg: `Information of ${person.name} has already been removed from server`, isSuccessful: false})
        setTimeout(() => {
          setNotification('')
        }, 5000);
        setPersons(persons.filter(person => person.id !== id))
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
      <Notification notification={notification} />
      <Filter value={filter} handleChange={handleChangeFilter} />
      <h3>add a new</h3>
      <PersonForm handleSubmit={addPerson} nameValue={newName} handleChangeName={handleChangeName} numberValue={newNumber} handleChangeNumber={handleChangeNumber} />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} handleRemove={removePerson} />
    </div>
  );
}

export default App;
