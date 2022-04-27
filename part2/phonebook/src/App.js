import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'
import Notification from './components/Notification'
import personsService from './services/personsService'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearchTerm, setSearchTerm] = useState('')
  const [notifMsg, setNotifMsg] = useState(null)

  useEffect(() => {
    personsService
      .getAllPersons()
      .then(persons => {
        setPersons(persons)
      })
  }, [])

  const regex = new RegExp(newSearchTerm, 'i')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleAddPerson = (event) => {
    event.preventDefault()
    if (persons.some((person) => person.name === newName)) {
      if (window.confirm(`${newName} is already in the phone book, would you like to replace their old number with the new number?`)) {
        const existingPerson = persons.find(person => person.name === newName)
        existingPerson.number = newNumber
        handleUpdatePerson(existingPerson.id, existingPerson)
      }
    } else {
      let newPerson = {
        name: newName,
        number: newNumber
      }
      personsService
        .createPerson(newPerson)
        .then(response => {
          setPersons(persons.concat(response))
          setNewName('')
          setNewNumber('')
          setNotifMsg(`${response.name} was successfully created.`)
          setTimeout(() => {
            setNotifMsg(null)
          }, 3000)
        })
        .catch(err => console.log(err))

    }
  }

  const handleDeletePerson = (event) => {
    event.preventDefault()
    let id = event.target.id
    if (window.confirm(`Do you really want to delete ${event.target.value}`)) {
      personsService
      .deletePerson(id)
      .then(
        setPersons(persons.filter(person => person.id !== parseInt(id)))
      )
      .catch(err => console.log(err))
    }
  }

  const handleUpdatePerson = (id, updatedInfo) => {
    personsService
      .updatePerson(id, updatedInfo)
      .then(response => {
        setPersons(persons.map(person => person.id !== id ? person : response))
        setNotifMsg(`${response.name} was successfully updated.`)
        setTimeout(() => {
          setNotifMsg(null)
        }, 3000)
      })
      .catch(err => console.log(err))
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        name="search"
        value={newSearchTerm}
        onChange={handleSearch}
      />
      <h2>Add New Entry</h2>
      <PersonForm 
        valueForNewName={newName}
        onChangeForhandleNameChange={handleNameChange}
        valueForNewNumber={newNumber}
        onChangeForhandleNumberChange={handleNumberChange}
        onClickForHandleAddPerson={handleAddPerson}
      />
      <h2>Numbers</h2>
      <Notification message={notifMsg} />
      <ul>
        {persons.filter((person) => regex.test(person.name)).map((person) => 
          <Person
            key={person.id} 
            name={person.name} 
            number={person.number}
            id={person.id}
            onDelete={handleDeletePerson}
          />
        )}
      </ul>
    </div>
  )
}

export default App