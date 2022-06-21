import { useSelector, useDispatch } from 'react-redux'
import { upVoteAnecdote } from '../reducers/anecdoteReducer'
import { createNotif, removeNotif } from '../reducers/notificationReducer'

import Notification from './Notification'
import Filter from './Filter'

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
      <Filter />
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