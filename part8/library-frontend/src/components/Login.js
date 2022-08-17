import { useState, useEffect } from "react"
import { useMutation } from "@apollo/client"
import { LOGIN } from "../queries"

const Login = ({ setToken, show }) => {
	const [username, setUsername] = useState("")

	const [login, result] = useMutation(LOGIN)

	useEffect(() => {
		if (result.data) {
			const token = result.data.login.value
			setToken(token)
			localStorage.setItem("library-user-token", token)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [result.data])

	if (!show) {
		return null
	}

	const submit = async (event) => {
		event.preventDefault()

		login({ variables: { username } })
		setUsername("")
	}

	return (
		<div>
			<form onSubmit={submit}>
				<input
					type="text"
					value={username}
					onChange={({ target }) => setUsername(target.value)}
				></input>
				<button type="submit">login</button>
			</form>
		</div>
	)
}

export default Login
