import { useState } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearchTerm, setSearchTerm] = useState('')

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