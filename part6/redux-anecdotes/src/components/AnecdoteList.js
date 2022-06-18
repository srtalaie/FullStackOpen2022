import { useSelector, useDispatch } from 'react-redux'
import { upVote } from '../reducers/anecdoteReducer'
import { createNotif, removeNotif } from '../reducers/notificationReducer'

import Notification from './Notification'

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
    
    const handleUpVote = (anecdote) => {
      dispatch(upVote(anecdote.id))
      dispatch(createNotif(`you voted '${anecdote.content}'`))
      setTimeout(() => {
        dispatch(removeNotif())
      }, 5000)
    }

  return (
    <div>
      <Notification 
        message={useSelector((state) => state.notification)}
      />
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <Anecdote 
            anecdote={anecdote}
            handleClick={() => { handleUpVote(anecdote)} }
        />
      )}
    </div>
  )
}

export default AnecdoteList