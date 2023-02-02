import { useMutation, useQuery, useQueryClient } from 'react-query'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

import { getAnecdotes, updateAnecdote } from './requests'

const App = () => {
  const queryClient = useQueryClient()

  //Get Anecdotes
  const anecdotes = useQuery('anecdotes', getAnecdotes, {
    refetchOnWindowFocus: false,
  })

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: (anecdote) => {
      const id = anecdote.id
      const anecdotes = queryClient.getQueryData('anecdotes')
      const upVotedAnecdote = anecdotes.find(anecdote => anecdote.id === id)
      const newAnecdotes = anecdotes.map((anecdote) => anecdote.id !== id ? anecdote : upVotedAnecdote)
      queryClient.setQueryData('anecdotes', newAnecdotes)
    }
  })

  //Upvote Anecdote
  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: (anecdote.votes += 1) })
  }

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
      {anecdotes.isLoading ? (<div>Fetching data...</div>) : (
        anecdotes.data.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        )
      )}

    </div>
  )
}

export default App
