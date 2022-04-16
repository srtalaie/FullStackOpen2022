const PersonForm = ({ valueForNewName, valueForNewNumber, onChangeForhandleNameChange, onChangeForhandleNumberChange, onClickForHandleAddPerson }) => {
  return (
    <form>
        <div>name: <input value={valueForNewName} onChange={onChangeForhandleNameChange} /></div>
        <div>number: <input value={valueForNewNumber} onChange={onChangeForhandleNumberChange} /></div>
    <div>
      <button type="submit" onClick={onClickForHandleAddPerson}>add</button>
    </div>
  </form>
  )
}

export default PersonForm