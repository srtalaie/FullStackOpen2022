import { createSlice } from "@reduxjs/toolkit"
import anecdoteServices from '../services/anecdotes'

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