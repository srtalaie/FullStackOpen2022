import PropTypes from 'prop-types'

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
        <div>
            username
          <input
            type="text"
            value={username}
            name="Username"
            id="username"
            onChange={onChangeUsername}
          />
        </div>
        <div>
            password
          <input
            type="password"
            value={password}
            name="Password"
            id="password"
            onChange={onChangePassword}
          />
        </div>
        <button type="submit" id="login-btn">login</button>
      </form>
    </>
  )
}

export default Login