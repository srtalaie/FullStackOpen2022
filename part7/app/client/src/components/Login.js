import PropTypes from 'prop-types'

import { Button, TextField, Box } from '@mui/material'

const Login = ({ handleLogin, username, password, onChangeUsername, onChangePassword }) => {
  Login.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    onChangeUsername: PropTypes.func.isRequired,
    onChangePassword: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }

  return (
    <>
      <form onSubmit={handleLogin}>
        <Box>
          <TextField
            variant="standard"
            label="username"
            value={username}
            name="Username"
            id="username"
            onChange={onChangeUsername}
          />
        </Box>
        <Box>
          <TextField
            type="password"
            label="password"
            value={password}
            name="Password"
            id="password"
            onChange={onChangePassword}
          />
        </Box>
        <Button type="submit" id="login-btn">login</Button>
      </form>
    </>
  )
}

export default Login