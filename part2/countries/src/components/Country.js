const Country = ({ name, onClick, value }) => {
  return (
    <div>{name} <button value={value} onClick={onClick}>Show</button></div>
  )
}

export default Country