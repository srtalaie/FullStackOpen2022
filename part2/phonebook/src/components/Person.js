const Person = ({ name, number }) => {
  return (
    <div key={name}>{name} {number}</div >
  )
}

export default Person