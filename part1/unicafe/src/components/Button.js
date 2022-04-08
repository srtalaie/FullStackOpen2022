const Button = ({ btnName, onClick }) => {
  return (
    <button onClick={onClick}>{btnName}</button>
  )
}

export default Button