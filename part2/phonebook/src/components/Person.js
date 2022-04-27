const Person = ({ name, number, id, onDelete  }) => {
  return (
    <div>{name} {number} <button id={id} value={name} onClick={onDelete}>delete</button></div >
  )
}

export default Person