const Notify = ({ errorMessage }) => {
	if (!errorMessage) {
		return null
	}
	console.log(errorMessage)
	return <div style={{ color: "red" }}>{errorMessage}</div>
}

export default Notify
