import { useSelector, useDispatch } from 'react-redux'
import { upVoteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

import ConnectedNotifications from './Notification'
import ConnectedFilter from './Filter'

const Anecdote = ({ anecdote, handleClick }) => {
    return(
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={handleClick}>vote</button>
          </div>
        </div>
    )
}

const AnecdoteList = () => {
    const anecdotes = useSelector((state) => state.anecdotes.slice().sort((a, b) => (b.votes - a.votes)))
    const dispatch = useDispatch()

    const filteredTerm = useSelector((state) => state.filter)
    const regex =  new RegExp(filteredTerm, 'i')
    
    const handleUpVote = (anecdote) => {
      dispatch(upVoteAnecdote(anecdote.id))
      dispatch(setNotification(`you voted '${anecdote.content}'`, 5000))
    }

  return (
    <div>
      <ConnectedNotifications 
        message={useSelector((state) => state.notification)}
      />
      <ConnectedFilter />
      <h2>Anecdotes</h2>
      {anecdotes.filter((anecdote) => regex.test(anecdote.content)).map((anecdote) =>
        <Anecdote 
            anecdote={anecdote}
            handleClick={() => { handleUpVote(anecdote)} }
        />
      )}
    </div>
  )
}

export default AnecdoteList