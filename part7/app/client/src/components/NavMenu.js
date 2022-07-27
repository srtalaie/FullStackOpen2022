import { Link } from 'react-router-dom'

import { Button, Box, AppBar, Typography } from '@mui/material'

const NavMenu = ({ name, handleLogout }) => {
  return (
    <Box>
      <AppBar position="static">
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
          <Button><Link to="/" style={{ textDecoration: 'none', color: 'white' }} >blogs</Link></Button>
          <Button><Link to="/users" style={{ textDecoration: 'none', color: 'white' }} >users</Link></Button>
          <Typography variant="h6">{name} is logged in<span><Button color="warning" variant="text" id="logout-btn" onClick={handleLogout}>logout</Button></span></Typography>
        </Box>
      </AppBar>
    </Box>
  )
}

export default NavMenu