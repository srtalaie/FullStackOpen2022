import { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(res => {
        setPersons(res.data)
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
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat({name: newName, number: newNumber}))
      setNewName('')
      setNewNumber('')
    }
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
      <ul>
        {persons.filter((person) => regex.test(person.name)).map((person) => 
          <Person 
            name={person.name} 
            number={person.number} 
          />
        )}
      </ul>
    </div>
  )
}

export default App