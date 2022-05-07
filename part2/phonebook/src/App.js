import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'
import Notification from './components/Notification'
import personsService from './services/personsService'

//Styles for Notification
const success = {
  color: 'green',
  background: 'lightgrey',
  fontSize: 20,
  borderStyle: 'solid',
  borderRadius: 5,
  padding: 10,
  marginBottom: 10,
}
const error = {
  color: 'red',
  background: 'lightgrey',
  fontSize: 20,
  borderStyle: 'solid',
  borderRadius: 5,
  padding: 10,
  marginBottom: 10,
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearchTerm, setSearchTerm] = useState('')
  const [notifMsg, setNotifMsg] = useState(null)
  const [isError, setIsError] = useState(false)

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
        .catch(err => {
          console.log(err)
          setIsError(true)
          setNotifMsg(`${err.toString()}, Unable to add ${newName}`)
          setTimeout(() => {
            setNotifMsg(null)
            setIsError(false)
          }, 3000)
        })

    }
  }

  const handleDeletePerson = (event) => {
    event.preventDefault()
    let id = event.target.id
    if (window.confirm(`Do you really want to delete ${event.target.value}`)) {
      personsService
      .deletePerson(id)
      .then(
        setPersons(persons.filter(person => person.id !== id))
      )
      .catch(err => {
        console.log(err)
        setIsError(true)
        setNotifMsg(`${err.toString()}, Unable to delete Person`)
        setTimeout(() => {
          setNotifMsg(null)
          setIsError(false)
        }, 3000)
      })
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
      .catch(err => {
        console.log(err)
        setIsError(true)
        setNotifMsg(`${err.toString()}, Unable to update ${updatedInfo.name}`)
        setTimeout(() => {
          setNotifMsg(null)
          setIsError(false)
        }, 3000)
      })
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notifMsg} messageStyle={isError ? error : success}/>
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