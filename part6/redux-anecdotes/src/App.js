import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { intitalizeAnecdotes } from './reducers/anecdoteReducer'

import ConnectedAnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

const App = () => {

const dispatch = useDispatch()
useEffect(() => {
  dispatch(intitalizeAnecdotes())
}, [dispatch])

  return (
    <div>
      <AnecdoteList />
      <ConnectedAnecdoteForm />
    </div>
  )
}

export default App