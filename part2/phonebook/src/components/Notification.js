const notification = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
}

const Notification = ({ message }) => {
    if (message === null) {
        return null
    }

    return (
        <div style={notification}>
            {message}
        </div>
    )
    
}

export default Notification