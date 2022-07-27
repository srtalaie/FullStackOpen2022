import { Link } from 'react-router-dom'

const padding = {
  paddingRight: 5
}

const NavMenu = ({ name, handleLogout }) => {
  return (
    <div>
      <Link to="/" style={padding}>blogs</Link>
      <Link to="/users" style={padding}>users</Link>
      <h2>{name} is logged in<span><button id="logout-btn" onClick={handleLogout}>logout</button></span></h2>
    </div>
  )
}

export default NavMenu