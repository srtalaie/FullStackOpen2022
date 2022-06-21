import { createSlice } from "@reduxjs/toolkit"
import anecdoteServices from '../services/anecdotes'

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

// const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    upVote: (state, action) => {
      const id = action.payload
      const anecdoteToVote = state.find(anecdote => anecdote.id === id)
      const upvotedAnecdote = {...anecdoteToVote,
        votes: anecdoteToVote.votes += 1
      }
      state = state.map(anecdote => anecdote.id !== id ? anecdote : upvotedAnecdote)
    },
    appendAnecdote: (state, action) => {
      state.push(action.payload)
    },
    setAnecdotes: (state, action) => {
      return action.payload
    }
  }
})

export const { upVote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const intitalizeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteServices.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteServices.createAnecdote(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const upVoteAnecdote = (id) => {
  return async dispatch => {
    const upVotedAnecdote = await anecdoteServices.upVoteAnecdote(id)
    dispatch(upVote(upVotedAnecdote.id))
  }
}

export default anecdoteSlice.reducer