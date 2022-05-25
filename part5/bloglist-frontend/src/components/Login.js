const Login = ({ handleLogin, username, password, onChangeUsername, onChangePassword }) => {
  return (
    <>
        <form onSubmit={handleLogin}>
            <div>
            username
                <input
                type="text"
                value={username}
                name="Username"
                onChange={onChangeUsername}
            />
            </div>
            <div>
            password
                <input
                type="password"
                value={password}
                name="Password"
                onChange={onChangePassword}
            />
            </div>
            <button type="submit">login</button>
        </form>
    </>
  )
}

export default Login